/* @flow */
import R from 'ramda';
import { createSelector } from 'reselect';
import { actions as formActions } from 'react-redux-form';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { uidSelector, profileSelector } from '../../Auth/auth';
import { MODEL_PATH, INITIAL_STATE } from '../Form';

// ------------------------------------
// Constants
// ------------------------------------
const PENDING_POST_KEY = 'pendingPost';

// ------------------------------------
// Selectors
// ------------------------------------

// pendingPostSelector :: State -> Object | Nil
export const pendingPostSelector = createSelector(
  profileSelector,
  R.compose(
    R.prop(PENDING_POST_KEY),
    R.defaultTo({}),
  ),
);

// pendingPostImagesSelector :: State -> Object | Nil
export const pendingPostImagesPathSelector = createSelector(
  uidSelector,
  R.unless(
    R.isNil,
    uid => `users/${uid}/${PENDING_POST_KEY}/images`,
  ),
);

// ------------------------------------
// Actions
// ------------------------------------
export const initializeForm = () => (dispatch: Dispatch, getState: Function) => {
  const state = getState();
  const profile = profileSelector(state);

  if (!isLoaded(profile) || isEmpty(profile)) {
    return;
  }

  const initialState = R.compose(
    R.pick(R.keys(INITIAL_STATE)),
    R.defaultTo({}),
    pendingPostSelector,
  )(state);

  if (R.either(R.isNil, R.isEmpty)(initialState)) {
    return;
  }

  // FIXME: This calls load multiple times
  // How to call load only once, as soon as the data becomes available?
  dispatch(formActions.load(MODEL_PATH, initialState));
};

export const savePendingPost = (post: Post | {}) =>
  (dispatch: Dispatch, getState: Function, getFirebase: Function) => {
    getFirebase().updateProfile({
      [PENDING_POST_KEY]: post,
    });
  };

export const createPost = (onCreate: ?Function) => (post: Post) =>
  (dispatch: Dispatch, getState: Function, getFirebase: Function) => {
    // FIXME: if for some reason pendingPostPath is nil,
    // this will delete everything!
    getFirebase()
      .push('/posts', post)
      .then(() => dispatch(savePendingPost({})))
      .then(() => dispatch(formActions.load(MODEL_PATH, {})))
      .then(onCreate);
  };

export const actions = {
  initializeForm,
  createPost,
  savePendingPost,
};
