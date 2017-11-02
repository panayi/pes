import * as R from 'ramda';
import fetch from 'node-fetch';
import uuid from 'uuid-v4';
import log from 'helpers/log';
import generateId from '../../../../src/utils/generateId';
import * as storagePaths from '../../../../src/services/firebase/storagePaths';
import fileMetadataFactory from '../../../../src/services/firebase/fileMetadataFactory';
import { FIREBASE_STORAGE_BUCKET } from '../../../../src/services/firebase/constants';
import { database } from '../../lib/firebaseClient';
import storage from '../../lib/storage';

// ------------------------------------
// Constants
// ------------------------------------
export const ALL_POSTS_ENDPOINT = 'http://real-estate.pesposa.com/post/json/19ajaisjo90323jio';
const FETCH_FAILED = 'fetchFailed';

// ------------------------------------
// Helpers
// ------------------------------------
const getPostPath = post => `/posts/${post.id}`;

const getFileUrl = (path, token) => (
  `https://firebasestorage.googleapis.com/v0/b/${FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(path)}?alt=media&token=${token}`
);

const computedProp = R.curry((key, computer, obj) => R.converge(R.assoc(key), [
  computer,
  R.identity,
])(obj));

// Maps old post attributes (MySQL DB) to new post attributes
const mapPost = R.compose(
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
    R.when(
      R.is(String),
      R.compose(
        R.map(file => `http://cdn.pesposa.com/data/images/${file}`),
        R.split(';'),
      ),
    ),
    R.prop('images'),
  )),
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

// ------------------------------------
// Actions
// ------------------------------------
export const uploadImage = async (buffer, filename, contentType, dbPath) => (
  new Promise((resolve, reject) => {
    const path = `${storagePaths.IMAGES}/${generateId()}/${buffer.name}`;
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


const importImages = async (post) => {
  const postPath = getPostPath(post);
  await R.compose(
    p => Promise.all(p),
    R.map(async (image) => {
      try {
        const response = await fetch(image);
        if (!R.equals(response.status, 200)) {
          throw new Error(FETCH_FAILED);
        }

        const contentType = response.headers.get('content-type');
        const buffer = await response.buffer();
        const filename = image.split('/').pop();
        return uploadImage(buffer, filename, contentType, `${postPath}/images`);
      } catch (error) {
        if (R.equals(error.message, FETCH_FAILED)) {
          log.error(`Failed to fetch ${image}`);
          return Promise.resolve();
        }

        throw error;
      }
    }),
    R.defaultTo([]),
    R.prop('images'),
  )(post);
};

const importPosts = async () => {
  const response = await fetch(ALL_POSTS_ENDPOINT);
  const json = await response.json();

  await R.compose(
    p => Promise.all(p),
    R.map(async (post) => {
      const postPath = getPostPath(post);
      const finalPost = R.omit(['images'], post);

      return Promise.all([
        await database.ref(postPath).update(finalPost),
        await importImages(post),
      ]);
    }),
    R.map(mapPost),
  )(json);

  return R.compose(
    R.length,
    R.values,
  )(json);
};

export default async () => {
  const numberOfPosts = await importPosts();
  return `Synced ${numberOfPosts} posts`;
};
