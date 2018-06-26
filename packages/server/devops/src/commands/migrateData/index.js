import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import logger from 'winston-color';
import promiseSerial from '@pesposa/core/src/utils/promiseSerial';
import env from '@pesposa/core/src/config/env';
import * as modelPaths from '@pesposa/core/src/config/modelPaths';
import * as sellerTypes from '@pesposa/core/src/config/sellerTypes';
import * as locationConfig from '@pesposa/core/src/config/location';
import * as adsConfig from '@pesposa/core/src/config/ads';
import getValidPhoneNumber from '@pesposa/server-core/src/utils/getValidPhoneNumber';
import parseNumber from '@pesposa/server-core/src/utils/parseNumber';
import fetchImageDimensions from '@pesposa/server-core/src/utils/getImageDimensions';
import firebase from '@pesposa/server-core/src/config/firebaseClient';
import * as locationService from '@pesposa/server-core/src/services/location';
import server from '@pesposa/server-core/src/server';
import { seed } from '../seed';
import createAlgoliaIndexes from '../initialize/createAlgoliaIndexes';
import productionJsonData from './pesposa-production-export.json';

const LEGACY_SOURCE_NAME = 'legacyPesposa';

const splitObjectEvery = (length, obj) =>
  R.compose(
    R.map(R.fromPairs),
    R.splitEvery(length),
    R.toPairs,
  )(obj);

const setTestData = async () => {
  const { ads } = productionJsonData;
  const { legacy, images } = ads;
  await firebase.set('/', null);
  const withoutAds = R.omit(['ads'], productionJsonData);
  const adsObj = R.omit(['legacy', 'images'], ads);
  await firebase.set('/', withoutAds);
  await firebase.set('/ads', adsObj);
  const imageGroups = splitObjectEvery(400, images);
  await Promise.all(
    R.map(group => firebase.update('/ads/images', group), imageGroups),
  );
  const legacyGroups = splitObjectEvery(400, legacy);
  await Promise.all(
    R.map(group => firebase.update('/ads/legacy', group), legacyGroups),
  );
};

// getImagesWithoutDimensions :: Images -> Images
const getImagesWithoutDimensions = R.map(R.omit(['dimensions']));

// getImagesWithoutDimensions :: Images -> Dimensions
const getImagesDimensions = async images => {
  const imagesDimensions = {};

  await promiseSerial(
    R.compose(
      R.map(([imageId, image]) => async () => {
        let { dimensions } = image;
        if (dimensions) {
          imagesDimensions[imageId] = dimensions;
          return Promise.resolve();
        }

        const { downloadURL } = image;
        try {
          dimensions = await fetchImageDimensions(downloadURL);
          imagesDimensions[imageId] = dimensions;
        } catch (error) {
          // do nothing
        }

        return Promise.resolve();
      }),
      R.toPairs,
    )(images),
  );

  return R.map(R.omit(['downloaded']), imagesDimensions);
};

// getImagesWithoutDimensions :: (Images, Dimensions) -> Thumbnail
const getThumbnail = (images, imagesDimensions) => {
  const image = R.compose(
    R.head,
    R.values,
  )(images);
  const imageId = R.compose(
    R.head,
    R.keys,
  )(images);
  const dimensions = imagesDimensions[imageId];

  return R.merge(image, {
    dimensions: dimensions || null,
  });
};

const getBody = R.compose(
  str => str.substring(0, adsConfig.BODY_MAX_LENGTH),
  R.propOr('', 'body'),
);

const getLocation = async ad => {
  let location = R.prop('location', ad);
  const geoposition = R.path(['location', 'geoposition'], ad);
  const address = R.path(['location', 'address'], ad);

  if (isNilOrEmpty(address) && geoposition) {
    location = await locationService.getFromGeoposition(location.geoposition);
    location = location ? R.reject(isNilOrEmpty, location) : location;

    if (isNilOrEmpty(location)) {
      location = {
        geoposition,
        address: {
          country: locationConfig.DEFAULT_COUNTRY_CODE,
        },
      };
    }
  }

  return R.omit(['source'], location);
};

export const migrateData = async options => {
  try {
    if (options.addTestDataOnly && !env.isProductionDeployment) {
      await setTestData();
      process.exit();
      return;
    }

    // -2. Re-create algolia indexes
    await createAlgoliaIndexes();

    // -1. Seed data
    logger.info('Seeding data...');
    await firebase.set('countryFlags', null);
    await seed();

    const allImagesSnap = await firebase.ref('/ads/images').once('value');
    const allImages = allImagesSnap.val();

    // 0. Delete legacy ads with neither an email, nor a phone, or with a phone outside Cyprus
    logger.info('Deleting legacy ads with neither an email, nor a phone...');
    let legacyAdsSnap = await firebase.ref('/ads/legacy').once('value');
    let legacyAds = legacyAdsSnap.val();
    await promiseSerial(
      R.map(
        ([legacyAdId, legacyAd]) => () => {
          const { email, phone } = legacyAd;
          const countryCode = phone
            ? R.compose(
                R.prop('country'),
                parseNumber,
              )(phone)
            : null;
          const isSupportedCountry =
            !countryCode || countryCode === locationConfig.DEFAULT_COUNTRY_CODE;
          if (
            (isNilOrEmpty(email) && isNilOrEmpty(phone)) ||
            !isSupportedCountry
          ) {
            const updates = {
              [`/ads/legacy/${legacyAdId}`]: null,
              [`/ads/images/${legacyAdId}`]: null,
            };
            return firebase.update('/', updates);
          }

          return Promise.resolve();
        },
        R.toPairs(legacyAds),
      ),
    );

    // 1. Transform legacy ads
    logger.info('Migrating legacy ads...');
    const sourcesSnap = await firebase
      .ref(modelPaths.SOURCES.string)
      .once('value');
    const legacySourceObj = R.compose(
      R.find(([, { name }]) => name === LEGACY_SOURCE_NAME),
      R.toPairs,
    )(sourcesSnap.val());
    let legacySourceId = legacySourceObj ? legacySourceObj[0] : null;
    if (isNilOrEmpty(legacySourceId)) {
      const legacySourceRef = await firebase.push(modelPaths.SOURCES.string, {
        name: LEGACY_SOURCE_NAME,
        url: 'http://pesposa.com',
      });
      legacySourceId = legacySourceRef.getKey();
    }
    legacyAdsSnap = await firebase.ref('/ads/legacy').once('value');
    legacyAds = legacyAdsSnap.val();
    await promiseSerial(
      R.map(
        ([legacyAdId, legacyAd]) => async () => {
          const { email, phone } = legacyAd;

          const countryCode = R.path(
            ['location', 'address', 'country'],
            legacyAd,
          );
          const finalPhone = getValidPhoneNumber(phone, countryCode);

          const images = R.propOr({}, legacyAdId, allImages);
          const imagesWithoutDimensions = getImagesWithoutDimensions(images);
          let imageDimensions = await getImagesDimensions(images);
          const thumbnail = getThumbnail(images, imageDimensions);
          imageDimensions = isNilOrEmpty(imageDimensions)
            ? null
            : imageDimensions;

          const location = await getLocation(legacyAd);

          let category = R.prop('category', legacyAd);
          category =
            category === 'fashion' ? 'fashion-and-accessories' : category;

          const body = getBody(legacyAd);

          return server.externalUsers
            .findOrCreate(firebase, { email, phone: finalPhone })
            .then(externalUserSnap => {
              const seller = externalUserSnap.key;
              const migratedAd = {
                createdAt: legacyAd.createdAt,
                seller,
                sellerType: sellerTypes.EXTERNAL_USER,
                source: legacySourceId,
                props: {
                  body,
                  category,
                  images: imagesWithoutDimensions,
                  location,
                  price: legacyAd.price || 0,
                  title: legacyAd.title,
                  sold: legacyAd.sold || null,
                },
                internalProps: {
                  imageDimensions,
                  thumbnail,
                },
              };
              const updates = {
                [`/ads/legacy/${legacyAdId}`]: null,
                [`/ads/images/${legacyAdId}`]: null,
                [`/${modelPaths.ADS.string}/${legacyAdId}`]: migratedAd,
                [`/${
                  modelPaths.SELLER_ADS(seller).string
                }/${legacyAdId}`]: migratedAd,
              };
              return firebase.update('/', updates);
            })
            .then(() =>
              logger.info(`Migrated legacy ad with id=${legacyAdId}`),
            );
        },
        R.toPairs(legacyAds),
      ),
    );

    // 2. Transform ads
    logger.info('Migrating published ads...');
    const adsSnap = await firebase.ref('/ads/published').once('value');
    const ads = adsSnap.val();
    await promiseSerial(
      R.map(
        ([adId, ad]) => async () => {
          const body = getBody(ad);
          const images = R.propOr({}, adId, allImages);
          const imagesWithoutDimensions = getImagesWithoutDimensions(images);
          let imageDimensions = await getImagesDimensions(images);
          const thumbnail = getThumbnail(images, imageDimensions);
          imageDimensions = isNilOrEmpty(imageDimensions)
            ? null
            : imageDimensions;
          const seller = ad.user;
          const location = await getLocation(ad);

          if (isNilOrEmpty(images)) {
            const updates = {
              [`/ads/published/${adId}`]: null,
              [`/ads/images/${adId}`]: null,
            };
            return firebase
              .update('/', updates)
              .then(() =>
                logger.info(
                  `Deleted invalid ad (because no images) with id=${adId}`,
                ),
              );
          }

          const migratedAd = {
            createdAt: ad.createdAt,
            seller,
            sellerType: sellerTypes.USER,
            props: {
              body,
              category: ad.category,
              images: imagesWithoutDimensions,
              location,
              price: ad.price || 0,
              title: ad.title,
              sold: ad.sold || null,
            },
            internalProps: {
              imageDimensions,
              thumbnail,
            },
          };
          const updates = {
            [`/ads/published/${adId}`]: null,
            [`/ads/images/${adId}`]: null,
            [`/${modelPaths.ADS.string}/${adId}`]: migratedAd,
            [`/${modelPaths.SELLER_ADS(seller).string}/${adId}`]: migratedAd,
          };
          return firebase
            .update('/', updates)
            .then(() => logger.info(`Migrated ad with id=${adId}`));
        },
        R.toPairs(ads),
      ),
    );

    // 3. Transform drafts
    logger.info('Migrating draft ads...');
    const draftsSnap = await firebase.ref('ads/draft').once('value');
    const drafts = draftsSnap.val();
    await Promise.all(
      R.map(([id, draft]) => {
        const updates = {
          [`/ads/draft/${id}`]: null,
          [`/drafts/${id}`]: draft,
        };
        return firebase.update('/', updates);
      }, R.toPairs(drafts)),
    );

    // 4. Cleanup
    logger.info('deleting /ads/byUser');
    await firebase.set('/ads/byUser', null);
  } catch (error) {
    logger.error(error);
  }

  logger.info('Done!');
  process.exit();
};

const command = program =>
  program
    .command('migrateData')
    .option('-t, --addTestDataOnly', 'Import production data for testing')
    .description('Migrate data to new schema')
    .action(migrateData);

export default command;
