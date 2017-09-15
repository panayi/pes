/* global fetch */
import R from 'ramda';
import { combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';

require('es6-promise').polyfill();
require('isomorphic-fetch');

// ------------------------------------
// Constants
// ------------------------------------
const RESET = 'admin/sync/RESET';
const SYNC_STARTED = 'admin/sync/SYNC_STARTED';
const SYNC_SUCCEEDED = 'admin/sync/SYNC_SUCCEEDED';
const SYNC_FAILED = 'admin/sync/SYNC_FAILED';
const POST_SYNC_SUCCESS = 'admin/sync/POST_SYNC_SUCCESS';
const IMAGE_SYNC_SUCCESS = 'admin/sync/IMAGE_SYNC_SUCCESS';

export const STATUS_IDLE = null;
export const STATUS_STARTED = 'syncStarted';
export const STATUS_SUCCEEDED = 'syncSucceeded';
export const STATUS_FAILED = 'syncFailed';

// const ALL_USERS_ENDPOINT = 'http://real-estate.pesposa.com/user/json/1231029fuisdhf849'
const ALL_POSTS_ENDPOINT = 'http://real-estate.pesposa.com/post/json/19ajaisjo90323jio';

const FIREBASE_CONSOLE_BASE_URL = 'https://console.firebase.google.com/u/0/project';

// ------------------------------------
// Helpers
// ------------------------------------
export const dataUrl = path =>
  `${FIREBASE_CONSOLE_BASE_URL}/${process.env.REACT_APP_FIREBASE_PROJECT_ID}/database/data/${path}`;

export const storageUrl = path =>
  `${FIREBASE_CONSOLE_BASE_URL}/${process.env.REACT_APP_FIREBASE_PROJECT_ID}/storage/${process.env.REACT_APP_STORAGE_BUCKET}/files/${path}`;

const computedProp = R.curry((key, computer, obj) => R.converge(R.assoc(key), [
  computer,
  R.identity,
])(obj));

// Maps old post attributes (MySQL DB) to new post attributes (Graphcool)
const mapPost = R.compose(
  R.pick([
    'id',
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
  computedProp('address', ({ level4, level3 }) => `${level4} ${level3}`),
  computedProp('body', R.prop('description')),
  computedProp('category', R.prop('categoryParent')),
);

const getPostPath = post => `/oldPosts/${post.id}`;

// ------------------------------------
// Actions
// ------------------------------------

const reset = createAction(RESET);
const syncStart = createAction(SYNC_STARTED);
const syncSuccess = createAction(SYNC_SUCCEEDED);
const syncFail = createAction(SYNC_FAILED);
const postSyncSuccess = createAction(POST_SYNC_SUCCESS);
const imageSyncSuccess = createAction(IMAGE_SYNC_SUCCESS);

const syncImages = post => (dispatch, getState, getFirebase) => {
  const storageRef = getFirebase().storage().ref();
  const postPath = getPostPath(post);
  const imagePromises = R.compose(
    R.map(image => (
      fetch(image)
        .then(result => result.blob())
        .then((blob) => {
          const filename = image.split('/').pop();
          const imageRef = storageRef.child(`${postPath}/${filename}`);

          return imageRef.put(blob)
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

  return fetch(ALL_POSTS_ENDPOINT)
    .then(result => result.json())
    .then(R.compose(
      promises => Promise.all(promises),
      R.map((post) => {
        const postPath = getPostPath(post);
        const finalPost = R.omit(['images'], post);
        const postPromise = firebase.update(postPath, finalPost);
        postPromise.then(() => dispatch(postSyncSuccess(post)));

        return Promise.all([
          postPromise,
          dispatch(syncImages(post)),
        ]);
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

export const actions = {
  syncPosts,
  syncAll,
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  status: STATUS_IDLE,
  posts: {},
  images: {},
};

const statusReducer = handleActions({
  [RESET]: R.always(initialState.status),
  [SYNC_STARTED]: R.always(STATUS_STARTED),
  [SYNC_SUCCEEDED]: R.always(STATUS_SUCCEEDED),
  [SYNC_FAILED]: R.always(STATUS_FAILED),
}, initialState.status);

const postsReducer = handleActions({
  [RESET]: R.always(initialState.posts),
  [POST_SYNC_SUCCESS]: (state, { payload }) => R.assoc(payload.id, payload, state),
}, initialState.posts);

const imagesReducer = handleActions({
  [RESET]: R.always(initialState.images),
  [IMAGE_SYNC_SUCCESS]: (state, { payload }) => R.assoc(
    payload.id,
    (state[payload.id] || 0) + 1,
    state,
  ),
}, initialState.images);

export default combineReducers({
  status: statusReducer,
  posts: postsReducer,
  images: imagesReducer,
});

// ------------------------------------
// Selectors
// ------------------------------------
const syncPath = ['admin', 'sync'];

export const statusSelector = R.path([...syncPath, 'status']);

const syncedImageSelector = R.path([...syncPath, 'images']);

const syncedPostsSelector = R.path([...syncPath, 'posts']);

export const postsSelector = createSelector(
  syncedPostsSelector,
  syncedImageSelector,
  R.useWith(R.merge, [
    R.identity,
    R.map(count => ({ syncedImagesCount: count })),
  ]),
);

export const selectors = {
  statusSelector,
  postsSelector,
};
