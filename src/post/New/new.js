/* @flow */
import * as R from 'ramda';
import { createSelector } from 'reselect';
import { actions as formActions } from 'react-redux-form';
import { push } from 'react-router-redux';
import propsSelector from '../../lib/selectors/props';
import { uidSelector, isAuthenticatedSelector } from '../../auth/auth';
import { MODEL_PATH, INITIAL_STATE } from '../Form';

// ------------------------------------
// Constants
// ------------------------------------
const PENDING_POSTS_KEY = 'pendingPosts';

// ------------------------------------
// Selectors
// ------------------------------------

// pendingPostSelector :: State -> Post | Nil
//   Post = Object
export const pendingPostSelector = createSelector(
  propsSelector,
  R.prop('pendingPost'),
);

// pendingPostImagesSelector :: State -> Object | Nil
export const pendingPostImagesPathSelector = createSelector(
  uidSelector,
  R.unless(
    R.isNil,
    uid => `${PENDING_POSTS_KEY}/${uid}/images`,
  ),
);

// ------------------------------------
// Actions
// ------------------------------------
export const initializeForm = (pendingPost: ?Post) => (dispatch: Dispatch) => {
  if (R.either(R.isNil, R.isEmpty)(pendingPost)) {
    return;
  }

  dispatch(formActions.load(MODEL_PATH, pendingPost));
};

export const savePendingPost = (post: Post | {}) =>
  (dispatch: Dispatch, getState: Function, getFirebase: Function) => {
    const uid = uidSelector(getState());
    getFirebase().update(`${PENDING_POSTS_KEY}/${uid}`, post);
  };

export const createPost = (onCreate: ?Function) => (post: Post) =>
  (dispatch: Dispatch, getState: Function, getFirebase: Function) => {
    const state = getState();
    const isAuthenticated = isAuthenticatedSelector(getState());

    if (!isAuthenticated) {
      return dispatch(push({
        pathname: '/auth/login',
        search: '?redirect=/p',
      }));
    }

    const finalPost = R.merge(post, {
      user: uidSelector(state),
    });

    return getFirebase()
      .push('/posts', finalPost)
      .then(() => dispatch(savePendingPost({})))
      .then(() => dispatch(formActions.load(MODEL_PATH, INITIAL_STATE)))
      .then(onCreate);
  };

export const actions = {
  initializeForm,
  createPost,
  savePendingPost,
};
