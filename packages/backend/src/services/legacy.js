import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import fetch from 'node-fetch';
import random from 'lodash.random';
import striptags from 'striptags';
import ImagesScraper from 'images-scraper';
import { generateId } from 'pesposa-utils';
import { storage as storageConfig } from 'pesposa-config';
import computedProp from 'utils/computedProp';
import * as fetchService from 'services/fetch';
import * as storageService from 'services/storage';
import log from 'utils/log';
import renameFile from 'utils/renameFile';
import * as gmapsService from 'services/gmaps';

const GoogleImagesScraper = new ImagesScraper.Google();

// ------------------------------------
// Constants
// ------------------------------------
export const ADS_ENDPOINT = `${
  process.env.LEGACY_PESPOSA_BASE_URL
}/posts/json/${process.env.LEGACY_PESPOSA_TOKEN}`;

const FETCH_FAILED = 'fetchFailed';
const MAX_IMAGE_WEB_FETCH_RETRIES = 4;

// ------------------------------------
// Helpers
// ------------------------------------
const getAdUrl = (id, category) =>
  `${process.env.LEGACY_PESPOSA_BASE_URL}/post/json/${
    process.env.LEGACY_PESPOSA_TOKEN
  }/${category}/${id}`;

const getAdPath = ad => `/ads/legacy/${ad.id}`;

// Transform old ad attributes (MySQL DB) to new ad attributes
const transformAd = R.compose(
  R.pick([
    'id',
    'createdAt',
    'body',
    'category',
    'email',
    'images',
    'phone',
    'title',
    'price',
  ]),
  computedProp(
    'images',
    R.compose(
      R.ifElse(
        R.is(String),
        R.compose(
          R.map(file => `http://cdn.pesposa.com/data/images/${file}`),
          R.split(';'),
        ),
        R.always([]),
      ),
      R.prop('images'),
    ),
  ),
  computedProp('id', ({ id, categoryParent }) => `${categoryParent}-${id}`),
  computedProp(
    'price',
    R.compose(
      R.defaultTo(null),
      R.unless(R.isNil, parseFloat),
      R.prop('price'),
    ),
  ),
  computedProp('body', R.compose(striptags, R.prop('description'))),
  computedProp('category', R.prop('categoryParent')),
  computedProp(
    'createdAt',
    R.compose(
      insertDate => new Date(insertDate).getTime(),
      R.prop('insertDate'),
    ),
  ),
);

const findImageWithGoogle = async ad => {
  const { title } = ad;

  try {
    const results = await GoogleImagesScraper.list({
      keyword: title,
      num: 10,
    });
    const result = results[random(0, results.length - 1)];
    const url = result && result.url;

    if (!url) {
      log.warn(`No Google Image results for query: ${title}`);
    }
    return result && result.url;
  } catch (error) {
    if (R.equals(error.message, FETCH_FAILED)) {
      log.warn(`Failed to search for image on Google`);
    } else {
      throw error;
    }

    return null;
  }
};

const uploadImage = async (buffer, filename, contentType, dbPath, database) => {
  const newFilename = renameFile(generateId(), filename);
  const path = `${storageConfig.IMAGES_PATH}/${newFilename}`;

  return storageService.uploadImage(
    buffer,
    contentType,
    path,
    newFilename,
    metadata => database.ref(dbPath).push(metadata),
  );
};

const sequentialImportImage = async (
  index,
  images,
  adId,
  database,
  didUploadImages,
) => {
  const image = images[index];
  let didUploadAnImage = didUploadImages;

  try {
    const { buffer, contentType } = await fetchService.getImage(image);

    const filename = image
      .split('/')
      .pop()
      .split('?')
      .shift();

    await uploadImage(
      buffer,
      filename,
      contentType,
      `ads/images/${adId}`,
      database,
    );
    didUploadAnImage = true;
    log.info(`Added image to ad with id=${adId} - ${image}`);
  } catch (error) {
    log.warn(error.message);
  }

  if (R.isNil(images[index + 1])) {
    return Promise.resolve(didUploadAnImage);
  }

  return sequentialImportImage(
    index + 1,
    images,
    adId,
    database,
    didUploadAnImage,
  );
};

const findImageFromWeb = async (finalAd, database) => {
  const imageFromWeb = await findImageWithGoogle(finalAd);
  if (imageFromWeb) {
    return sequentialImportImage(
      0,
      [imageFromWeb],
      finalAd.id,
      database,
      false,
    );
  }

  return true;
};

// ------------------------------------
// Actions
// ------------------------------------
export const importAd = async (ad, database) => {
  try {
    const transformedAd = transformAd(ad);

    if (
      isNilOrEmpty(transformedAd.email) &&
      isNilOrEmpty(transformedAd.phone)
    ) {
      throw new Error(
        `Legacy ad with id=${ad.id} has neither an email nor a phone`,
      );
    }

    const adPath = getAdPath(transformedAd);
    const images = R.prop('images', transformedAd);

    const { lat, lng } = ad;
    const geoposition = {
      latitude: parseFloat(lat),
      longitude: parseFloat(lng),
    };
    const address = await gmapsService.reverseGeocode(geoposition);
    const location = { address, geoposition };
    const finalAd = R.compose(
      R.assoc('location', location),
      R.omit(['images']),
    )(transformedAd);
    await database.ref(adPath).update(finalAd);

    const didUploadAnImage = R.isNil(images[0])
      ? await Promise.resolve(false)
      : await sequentialImportImage(0, images, finalAd.id, database, false);

    if (!didUploadAnImage) {
      let retries = 0;
      let didUploadAnImageFromWeb = await findImageFromWeb(finalAd, database);

      while (
        !didUploadAnImageFromWeb &&
        retries < MAX_IMAGE_WEB_FETCH_RETRIES
      ) {
        didUploadAnImageFromWeb = await findImageFromWeb(finalAd, database); // eslint-disable-line no-await-in-loop
        retries += 1;
      }
    }
  } catch (error) {
    log.warn(error.message);
  }
};

export const fetchAd = async (id, category) => {
  const response = await fetch(getAdUrl(id, category));
  const ad = await response.json();

  return ad;
};
