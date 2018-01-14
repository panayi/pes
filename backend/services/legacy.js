import * as R from 'ramda';
import fetch from 'node-fetch';
import uuid from 'uuid-v4';
import generateId from 'frontend/utils/generateId';
import * as storageConstants from 'frontend/constants/storage';
import fileMetadataFactory from 'utils/fileMetadataFactory';
import storage from 'utils/storage';
import log from 'utils/log';

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

const computedProp = R.curry((key, computer, obj) =>
  R.converge(R.assoc(key), [computer, R.identity])(obj),
);

// Transform old ad attributes (MySQL DB) to new ad attributes
const transformAd = R.compose(
  R.assoc('isLegacy', true),
  R.pick([
    'id',
    'createdAt',
    'address',
    'body',
    'categoryChild',
    'category',
    'email',
    'images',
    'permalink',
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
    'address',
    R.compose(R.join(' '), R.filter(R.identity), ({ level4, level3 }) => [
      level4,
      level3,
    ]),
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

const uploadImage = async (buffer, filename, contentType, dbPath, database) =>
  new Promise((resolve, reject) => {
    const path = `${storageConstants.IMAGES_PATH}/${generateId()}/${filename}`;
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

const sequentialImportImage = async (index, images, adPath, database) => {
  const image = images[index];

  try {
    const response = await fetch(image);
    if (!R.equals(response.status, 200)) {
      throw new Error(FETCH_FAILED);
    }

    const contentType = response.headers.get('content-type');
    const buffer = await response.buffer();
    const filename = image.split('/').pop();

    await uploadImage(
      buffer,
      filename,
      contentType,
      `${adPath}/images`,
      database,
    );
  } catch (error) {
    if (R.equals(error.message, FETCH_FAILED)) {
      log.warn(`Failed to fetch ${image}`);
    } else {
      throw error;
    }
  }

  if (R.isNil(images[index + 1])) {
    return Promise.resolve();
  }

  return sequentialImportImage(index + 1, images, adPath, database);
};

export const importAd = async (ad, database) => {
  const transformedAd = transformAd(ad);
  const adPath = getAdPath(transformedAd);
  const finalAd = R.omit(['images'], transformedAd);
  const images = R.prop('images', transformedAd);

  return Promise.all([
    await database.ref(adPath).update(finalAd),
    R.isNil(images[0])
      ? Promise.resolve()
      : await sequentialImportImage(0, images, adPath, database),
  ]);
};

export const fetchAd = async (id, category) => {
  const response = await fetch(getAdUrl(id, category));
  const ad = await response.json();

  return ad;
};
