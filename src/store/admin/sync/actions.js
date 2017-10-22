import * as R from 'ramda';
import { createAction } from 'redux-actions';
import { uploadImage } from 'components/smarts/UploadFile/uploadFile';
import * as types from './types';
import * as constants from './constants';

// ------------------------------------
// Helpers
// ------------------------------------
const getPostPath = post => `/posts/${post.id}`;

const computedProp = R.curry((key, computer, obj) => R.converge(R.assoc(key), [
  computer,
  R.identity,
])(obj));

// Maps old post attributes (MySQL DB) to new post attributes (Graphcool)
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
const reset = createAction(types.RESET);
const syncStart = createAction(types.SYNC_STARTED);
const syncSuccess = createAction(types.SYNC_SUCCEEDED);
const syncFail = createAction(types.SYNC_FAILED);
const postSyncSuccess = createAction(types.POST_SYNC_SUCCESS);
const imageSyncSuccess = createAction(types.IMAGE_SYNC_SUCCESS);

const syncImages = post => (dispatch) => {
  const postPath = getPostPath(post);
  const imagePromises = R.compose(
    R.map(image => (
      fetch(image)
        .then(result => result.blob())
        .then((blob) => {
          const filename = image.split('/').pop();
          const finalBlob = blob;
          finalBlob.name = filename;
          return dispatch(uploadImage(finalBlob, `${postPath}/images`))
            .then(() => dispatch(imageSyncSuccess(post)));
        })
        .catch(error => Promise.resolve(error))
    )),
    R.defaultTo([]),
    R.prop('images'),
  )(post);

  return Promise.all(imagePromises);
};

const syncPosts = () => (dispatch, getState, getFirebase) => {
  const firebase = getFirebase();

  return fetch(constants.ALL_POSTS_ENDPOINT)
    .then(result => result.json())
    .then(R.compose(
      promises => Promise.all(promises),
      R.map((post) => {
        const postPath = getPostPath(post);
        const finalPost = R.omit(['images'], post);

        return firebase.update(postPath, finalPost)
          .then(() => dispatch(syncImages(post)))
          .then(() => dispatch(postSyncSuccess(post)));
      }),
      R.map(mapPost),
    ));
};

export const syncAll = () => (dispatch) => {
  dispatch(reset());
  dispatch(syncStart());

  Promise.all([
    dispatch(syncPosts()),
  ])
    .then(() => dispatch(syncSuccess()))
    .catch((error) => {
      console.log(error); // eslint-disable-line no-console
      dispatch(syncFail());
    });
};
