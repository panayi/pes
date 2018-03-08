import fs from 'fs';
import path from 'path';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import fetch from 'node-fetch';
import random from 'lodash.random';
import striptags from 'striptags';
import ImagesScraper from 'images-scraper';
import generateId from '../utils/generateId';
import * as storageConfig from '../config/storage';
import computedProp from '../utils/computedProp';
import * as fetchService from '../services/fetch';
import * as storageService from '../services/storage';
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

const mapLegacyToNewCategory = ad => {
  const { categoryParent, categoryChild } = ad;

  if (categoryParent === 'real_estate') {
    return 'real-estate';
  }

  if (categoryChild === 'cars') {
    return 'cars';
  }

  if (categoryParent === 'vehicles') {
    return 'other-vehicles-and-parts';
  }

  if (categoryChild === 'home_and_garden') {
    return 'home-and-garden';
  }

  if (
    R.contains(categoryChild, [
      'home_appliances',
      'electronics',
      'computing',
      'cell_phones',
      'cameras_and_accessories',
    ])
  ) {
    return 'electronics';
  }

  if (
    R.contains(categoryChild, [
      'hunting_stuff',
      'fishing_diving_stuff',
      'musical_instruments',
      'toys_and_hobbies',
      'video_games',
      'sporting_goods',
      'antiques_collectibles',
      'books',
    ])
  ) {
    return 'sports-and-leisure';
  }

  if (R.contains(categoryChild, ['jewelry_watches', 'clothing'])) {
    return 'fashion';
  }

  return 'other';
};

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
  computedProp('category', mapLegacyToNewCategory),
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
  const storagePath = `${storageConfig.IMAGES_PATH}/${newFilename}`;

  return storageService.uploadImage(
    buffer,
    contentType,
    storagePath,
    newFilename,
    metadata => database.ref(dbPath).push(metadata),
  );
};

const fetchImages = async images => {
  try {
    const data = [];
    await Promise.all(
      R.map(async image => {
        const result = await fetchService.getImage(image);
        const { buffer, contentType } = result;
        const filename = image
          .split('/')
          .pop()
          .split('?')
          .shift();

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
    images = fetchImages([imageFromWeb]);

    while (
      imageFromWeb &&
      R.isEmpty(images) &&
      retries < MAX_IMAGE_WEB_FETCH_RETRIES
    ) {
      imageFromWeb = await findImageWithGoogle(finalAd); // eslint-disable-line no-await-in-loop
      images = fetchImages([imageFromWeb]);
      retries += 1;
    }
  }

  return R.assoc('images', images, finalAd);
};

// Adapters

export const fetchAd = async (id, category) => {
  const response = await fetch(getAdUrl(id, category));
  const ad = await response.json();

  return ad;
};

export const legacyToLocal = async (legacyAd, rootDirectory) => {
  try {
    const ad = await transformLegacyAd(legacyAd);

    const adPath = path.resolve(rootDirectory, ad.id);
    const adWithoutImagesBuffer = R.evolve({
      images: R.map(R.omit(['buffer'])),
    });
    fs.writeFile(
      path.join(adPath, 'data.json'),
      JSON.stringify(adWithoutImagesBuffer),
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
    const localAdPath = path.resolve(rootDirectory, adId);
    const firebaseAdPath = getAdPath(adId);
    const adJson = fs.readFileSync(path.join(localAdPath, 'data.json'), 'utf8');
    const ad = JSON.parse(adJson);
    await database.ref(firebaseAdPath).update(R.omit(['images'], ad));

    await Promise.all(
      R.map(image => {
        const buffer = fs.readFileSync(path.join(localAdPath, image.filename));
        return uploadImage(
          buffer,
          image.filename,
          image.contentType,
          `ads/images/${adId}`,
          database,
        );
      }, ad.images),
    );
  } catch (error) {
    log.warn(error.message);
  }
};

export const legacyToFirebase = async (legacyAd, database) => {
  try {
    const ad = transformLegacyAd(legacyAd);
    const adPath = getAdPath(ad.id);
    await database.ref(adPath).update(R.omit(['images'], ad));
    await Promise.all(
      R.map(
        ({ buffer, filename, contentType }) =>
          uploadImage(
            buffer,
            filename,
            contentType,
            `ads/images/${ad.id}`,
            database,
          ),
        ad.images,
      ),
    );
  } catch (error) {
    log.warn(error.message);
  }
};
