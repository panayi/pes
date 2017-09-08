import R from 'ramda';
import { createSelector } from 'reselect';
import { actions as formActions } from 'react-redux-form';
import { uidSelector } from '../../Auth/auth';
import { DATA_PATH } from '../../Firebase/firebase';
import { MODEL_PATH, INITIAL_STATE } from '../Form';
import type { Props } from './types';

// ------------------------------------
// Constants
// ------------------------------------
const PENDING_POSTS_KEY = 'pendingPosts';

// ------------------------------------
// Selectors
// ------------------------------------

// pendingPostPathSelector :: State -> String | Nil
export const pendingPostPathSelector = createSelector(
  uidSelector,
  R.unless(
    R.isNil,
    uid => `${PENDING_POSTS_KEY}/${uid}`,
  ),
);

// pendingPostImagesPathSelector :: State -> String | Nil
export const pendingPostImagesPathSelector = createSelector(
  pendingPostPathSelector,
  R.unless(
    R.isNil,
    R.concat(R.__, '/images'),
  ),
);

// pendingPostsSelector :: State -> Object
const pendingPostsSelector = R.compose(
  R.defaultTo({}),
  R.path([...DATA_PATH, PENDING_POSTS_KEY]),
);

// pendingPostSelector :: State -> Object | Nil
export const pendingPostSelector = createSelector(
  uidSelector,
  pendingPostsSelector,
  R.prop,
);

// ------------------------------------
// Actions
// ------------------------------------

// @flow
export const initializeForm = (props: Props) => (dispatch: Dispatch) => {
  const initialState = R.compose(
    R.pick(R.keys(INITIAL_STATE)),
    R.defaultTo({}),
  )(props.pendingPost);

  // FIXME: This calls load multiple times
  // How to call load only once, as soon as the data becomes available?
  dispatch(formActions.load(MODEL_PATH, initialState));
};

// @flow
export const createPost = (onCreate: Function) => (post: Post) =>
  (dispatch: Dispatch, getState: Function, getFirebase: Function) => {
    // FIXME: if for some reason pendingPostPath is nil,
    // this will delete everything!
    const pendingPostPath = pendingPostPathSelector(getState());
    const firebase = getFirebase();

    firebase
      .push('/posts', post)
      .then(() => {
        firebase.set(pendingPostPath, {});
      })
      .then(() => dispatch(formActions.load(MODEL_PATH, {})))
      .then(onCreate);
  };

export const savePendingPost = (post: Post) =>
  (dispatch: Dispatch, getState: Function, getFirebase: Function) => {
    const pendingPostPath = pendingPostPathSelector(getState());
    getFirebase().update(pendingPostPath, post);
  };

export const actions = {
  initializeForm,
  createPost,
  savePendingPost,
};
