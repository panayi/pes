import fs from 'fs-extra';
import path from 'path';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import uuid from 'uuid-v4';
import fetch from 'node-fetch';
import random from 'lodash.random';
import striptags from 'striptags';
import ImagesScraper from 'images-scraper';
import generateId from '../utils/generateId';
import * as storageConfig from '../config/storage';
import computedProp from '../utils/computedProp';
import promiseSerial from '../utils/promiseSerial';
import * as fetchService from '../services/fetch';
import * as storageService from '../services/storage';
import getLegacyAdId from '../utils/getLegacyAdId';
import mapLegacyToNewCategory from '../utils/mapLegacyToNewCategory';
import log from '../utils/log';
import renameFile from '../utils/renameFile';
import * as gmapsService from '../services/gmaps';

const GoogleImagesScraper = new ImagesScraper.Google();

export const ADS_ENDPOINT = `${
  process.env.LEGACY_PESPOSA_BASE_URL
}/posts/json/${process.env.LEGACY_PESPOSA_TOKEN}`;

const FETCH_FAILED = 'fetchFailed';
const MAX_IMAGE_WEB_FETCH_RETRIES = 4;

const getAdUrl = (id, category) =>
  `${process.env.LEGACY_PESPOSA_BASE_URL}/post/json/${
    process.env.LEGACY_PESPOSA_TOKEN
  }/${category}/${id}`;

const getAdPath = adId => `/ads/legacy/${adId}`;

// Transform old ad attributes (MySQL DB) to new ad attributes
const transformAdProperties = R.compose(
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
  computedProp('id', getLegacyAdId),
  computedProp(
    'price',
    R.compose(
      R.defaultTo(null),
      R.unless(R.isNil, parseFloat),
      R.prop('price'),
    ),
  ),
  computedProp(
    'city',
    R.compose(R.when(R.equals('Lefkoşa'), R.always('Nicosia')), R.prop('city')),
  ),
  computedProp('body', R.compose(striptags, R.prop('description'))),
  computedProp('category', ({ categoryParent, categoryChild }) =>
    mapLegacyToNewCategory(categoryParent, categoryChild),
  ),
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

    const finalResults = R.reject(
      R.propSatisfies(R.test(/offer\.com\.cy/), 'url'),
      results,
    );
    const result = finalResults[random(0, results.length - 1)];
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

  return storageService.uploadFile(
    buffer,
    contentType,
    storageConfig.IMAGES_PATH,
    newFilename,
    metadata => database.ref(dbPath).push(metadata),
  );
};

const uploadImages = async (images, adId, database) => {
  const funcs = R.compose(
    R.map(image => () =>
      uploadImage(
        image.buffer,
        image.filename,
        image.contentType,
        `ads/images/${adId}`,
        database,
      ),
    ),
    R.defaultTo([]),
  )(images);

  return promiseSerial(funcs);
};

const fetchImages = async images => {
  try {
    const data = [];
    await Promise.all(
      R.map(async image => {
        const result = await fetchService.getImage(image);
        const { buffer, contentType } = result;
        const filename = uuid();

        data.push({ buffer, contentType, filename });

        return result;
      }, images),
    );
    return data;
  } catch (error) {
    log.warn(error.message);
    return [];
  }
};

const transformLegacyAd = async ad => {
  const transformedAd = transformAdProperties(ad);

  if (isNilOrEmpty(transformedAd.email) && isNilOrEmpty(transformedAd.phone)) {
    throw new Error(
      `Legacy ad with id=${ad.id} has neither an email nor a phone`,
    );
  }

  let images = R.prop('images', transformedAd);

  const { lat, lng } = ad;
  const geoposition = {
    latitude: parseFloat(lat),
    longitude: parseFloat(lng),
  };
  const address = await gmapsService.reverseGeocode(geoposition);
  const location = { address, geoposition };
  const finalAd = R.compose(R.assoc('location', location), R.omit(['images']))(
    transformedAd,
  );

  images = R.isNil(images[0]) ? [] : await fetchImages(images);

  if (R.isEmpty(images)) {
    let retries = 0;
    let imageFromWeb = await findImageWithGoogle(finalAd);
    images = await fetchImages([imageFromWeb]);

    while (
      imageFromWeb &&
      R.isEmpty(images) &&
      retries < MAX_IMAGE_WEB_FETCH_RETRIES
    ) {
      imageFromWeb = await findImageWithGoogle(finalAd); // eslint-disable-line no-await-in-loop
      images = await fetchImages([imageFromWeb]); // eslint-disable-line no-await-in-loop
      retries += 1;
    }
  }

  return R.assoc('images', images, finalAd);
};

export const fetchAd = async (id, category) => {
  const response = await fetch(getAdUrl(id, category));
  const ad = await response.json();
  return ad;
};

// Adapters

export const legacyToLocal = async (legacyAd, rootDirectory) => {
  try {
    const adId = getLegacyAdId(legacyAd);
    const adPath = path.resolve(rootDirectory, adId);

    try {
      fs.statSync(adPath);
      log.warn(`Ad with id=${adId} is already downloaded`);
      return;
    } catch (error) {
      // do nothing - folder does not exist
    }

    const ad = await transformLegacyAd(legacyAd);
    const adWithoutImagesBuffer = R.evolve(
      {
        images: R.map(R.omit(['buffer'])),
      },
      ad,
    );

    fs.ensureDirSync(adPath);
    fs.writeFileSync(
      path.join(adPath, 'data.json'),
      JSON.stringify(adWithoutImagesBuffer, null, 2),
      'utf8',
    );

    await Promise.all(
      R.map(
        image => fs.writeFile(path.join(adPath, image.filename), image.buffer),
        ad.images,
      ),
    );
  } catch (error) {
    log.warn(error.message);
  }
};

export const localToFirebase = async (adId, database, rootDirectory) => {
  try {
    log.info(`Publishing legacy ad with id=${adId}`);

    const localAdPath = path.resolve(rootDirectory, adId);
    const ad = fs.readJsonSync(path.join(localAdPath, 'data.json'), 'utf8');
    const firebaseAdPath = getAdPath(adId);
    const adRef = database.ref(firebaseAdPath);

    if (isNilOrEmpty(ad.images)) {
      log.warn(`Ad with ${adId} has no images`);
    }

    const adSnapshot = await adRef.once('value');
    if (adSnapshot.exists()) {
      return null;
    }

    await adRef.update(R.omit(['images'], ad));

    const imagesWithBuffer = R.compose(
      R.map(image =>
        R.assoc(
          'buffer',
          fs.readFileSync(path.join(localAdPath, image.filename)),
          image,
        ),
      ),
      R.defaultTo([]),
    )(ad.images);
    return uploadImages(imagesWithBuffer, adId, database);
  } catch (error) {
    log.error(error.message);
    throw error;
  }
};

export const migratePersonals = async (adId, database, rootDirectory) => {
  try {
    if (!R.test(/^personals-/, adId)) {
      return;
    }

    const localAdPath = path.resolve(rootDirectory, adId);
    const ad = fs.readJsonSync(path.join(localAdPath, 'data.json'), 'utf8');
    const migratedAd = R.merge(ad, { category: 'personals' });

    fs.writeFileSync(
      path.join(localAdPath, 'data.json'),
      JSON.stringify(migratedAd, null, 2),
      'utf8',
    );
  } catch (error) {
    log.error(error.message);
    throw error;
  }
};
