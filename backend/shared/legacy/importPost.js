import * as R from 'ramda';
import fetch from 'node-fetch';
import uuid from 'uuid-v4';
import generateId from '../../../src/utils/generateId';
import * as storagePaths from '../../../src/services/firebase/storagePaths';
import fileMetadataFactory from '../../../src/services/firebase/fileMetadataFactory';
import { FIREBASE_STORAGE_BUCKET } from '../../../src/services/firebase/constants';
import storage from '../helpers/storage';
import log from '../helpers/log';

// ------------------------------------
// Constants
// ------------------------------------
const FETCH_FAILED = 'fetchFailed';

// ------------------------------------
// Helpers
// ------------------------------------
const getPostPath = post => `/posts/${post.id}`;

const computedProp = R.curry((key, computer, obj) => R.converge(R.assoc(key), [
  computer,
  R.identity,
])(obj));

// Transform old post attributes (MySQL DB) to new post attributes
const transformPost = R.compose(
  R.assoc('isOld', true),
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
  computedProp('images', R.compose(
    R.ifElse(
      R.is(String),
      R.compose(
        R.map(file => `http://cdn.pesposa.com/data/images/${file}`),
        R.split(';'),
      ),
      R.always([]),
    ),
    R.prop('images'),
  )),
  computedProp('id', ({ id, categoryParent }) => `${categoryParent}-${id}`),
  computedProp('oldPosterId', R.compose(
    R.head,
    R.split(' '),
    R.trim,
    R.defaultTo(''),
    R.prop('user'),
  )),
  computedProp('address', R.compose(
    R.join(' '),
    R.filter(R.identity),
    ({ level4, level3 }) => ([level4, level3]),
  )),
  computedProp('body', R.prop('description')),
  computedProp('category', R.prop('categoryParent')),
  computedProp('createdAt', R.compose(
    insertDate => (new Date(insertDate)).getTime(),
    R.prop('insertDate'),
  )),
);

const getFileUrl = (path, token) => (
  `https://firebasestorage.googleapis.com/v0/b/${FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(path)}?alt=media&token=${token}`
);

const uploadImage = async (buffer, filename, contentType, dbPath, database) => (
  new Promise((resolve, reject) => {
    const path = `${storagePaths.IMAGES}/${generateId()}/${filename}`;
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
  })
);

const sequentialImportImage = async (index, images, postPath, database) => {
  const image = images[index];

  try {
    const response = await fetch(image);
    if (!R.equals(response.status, 200)) {
      throw new Error(FETCH_FAILED);
    }

    const contentType = response.headers.get('content-type');
    const buffer = await response.buffer();
    const filename = image.split('/').pop();

    await uploadImage(buffer, filename, contentType, `${postPath}/images`, database);
  } catch (error) {
    if (R.equals(error.message, FETCH_FAILED)) {
      log.error(`Failed to fetch ${image}`);
    } else {
      throw error;
    }
  }

  if (R.isNil(images[index + 1])) {
    return Promise.resolve();
  }

  return sequentialImportImage(index + 1, images, postPath, database);
};

export default async (post, database) => {
  const transformedPost = transformPost(post);
  const postPath = getPostPath(transformedPost);
  const finalPost = R.omit(['images'], transformedPost);
  const images = R.prop('images', transformedPost);

  return Promise.all([
    await database.ref(postPath).update(finalPost),
    R.isNil(images[0])
      ? Promise.resolve()
      : await sequentialImportImage(0, images, postPath, database),
  ]);
};
