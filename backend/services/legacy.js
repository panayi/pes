import * as R from 'ramda';
import fetch from 'node-fetch';
import uuid from 'uuid-v4';
import random from 'lodash.random';
import ImagesScraper from 'images-scraper';
import generateId from 'frontend/utils/generateId';
import * as storageConstants from 'frontend/constants/storage';
import fileMetadataFactory from 'utils/fileMetadataFactory';
import computedProp from 'utils/computedProp';
import storage from 'utils/storage';
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

// ------------------------------------
// Helpers
// ------------------------------------
const getAdUrl = (id, category) =>
  `${process.env.LEGACY_PESPOSA_BASE_URL}/post/json/${
    process.env.LEGACY_PESPOSA_TOKEN
  }/${category}/${id}`;

const getAdPath = ad => `/ads/published/${ad.id}`;

// Transform old ad attributes (MySQL DB) to new ad attributes
const transformAd = R.compose(
  R.assoc('isLegacy', true),
  R.pick([
    'id',
    'createdAt',
    'body',
    'category',
    'email',
    'images',
    'phone',
    'oldPosterId',
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
    'oldPosterId',
    R.compose(R.head, R.split(' '), R.trim, R.defaultTo(''), R.prop('user')),
  ),
  computedProp(
    'price',
    R.compose(
      R.defaultTo(null),
      R.unless(R.isNil, parseFloat),
      R.prop('price'),
    ),
  ),
  computedProp('body', R.prop('description')),
  computedProp('category', R.prop('categoryParent')),
  computedProp(
    'createdAt',
    R.compose(
      insertDate => new Date(insertDate).getTime(),
      R.prop('insertDate'),
    ),
  ),
);

const getFileUrl = (path, token) =>
  `https://firebasestorage.googleapis.com/v0/b/${
    storageConstants.BUCKET
  }/o/${encodeURIComponent(path)}?alt=media&token=${token}`;

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

const uploadImage = async (buffer, filename, contentType, dbPath, database) =>
  new Promise((resolve, reject) => {
    const newFilename = renameFile(generateId(), filename);
    const path = `${storageConstants.IMAGES_PATH}/${newFilename}`;

    const file = storage.file(path);
    const token = uuid();
    const stream = file.createWriteStream({
      uploadType: 'media',
      metadata: {
        contentType,
        metadata: {
          firebaseStorageDownloadTokens: token,
        },
      },
    });

    stream.on('error', error => reject(error));
    stream.on('finish', async () => {
      const result = {
        metadata: {
          name: filename,
          fullPath: path,
          downloadURLs: [getFileUrl(path, token)],
        },
      };
      const fileData = fileMetadataFactory(result);
      await database.ref(dbPath).push(fileData);

      resolve();
    });
    stream.end(buffer);
  });

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
    const response = await fetch(image);
    if (!R.equals(response.status, 200)) {
      throw new Error(FETCH_FAILED);
    }

    const contentType = response.headers.get('content-type');

    if (!R.contains(contentType, ['image/jpeg', 'image/png', 'image/gif'])) {
      throw new Error(
        `Content type is ${contentType} and not an image as expected`,
      );
    }

    const buffer = await response.buffer();
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
    if (!R.equals(error.message, FETCH_FAILED)) {
      log.warn(error.message);
    }
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
  const transformedAd = transformAd(ad);
  const adPath = getAdPath(transformedAd);
  const images = R.prop('images', transformedAd);

  const { lat, lng } = ad;
  const geoposition = { latitude: parseFloat(lat), longitude: parseFloat(lng) };
  const address = await gmapsService.reverseGeocode(geoposition);
  const location = R.merge(address, { geoposition });
  const finalAd = R.compose(R.assoc('location', location), R.omit(['images']))(
    transformedAd,
  );
  await database.ref(adPath).update(finalAd);

  const didUploadAnImage = R.isNil(images[0])
    ? await Promise.resolve(false)
    : await sequentialImportImage(0, images, finalAd.id, database, false);

  if (!didUploadAnImage) {
    let retries = 0;
    let didUploadAnImageFromWeb = await findImageFromWeb(finalAd, database);

    while (!didUploadAnImageFromWeb && retries < 4) {
      didUploadAnImageFromWeb = await findImageFromWeb(finalAd, database); // eslint-disable-line no-await-in-loop
      retries += 1;
    }
  }
};

export const fetchAd = async (id, category) => {
  const response = await fetch(getAdUrl(id, category));
  const ad = await response.json();

  return ad;
};
