/* @flow */
import * as R from 'ramda';
import { actions as formActions } from 'react-redux-form';
import { push } from 'react-router-redux';
import { uidSelector, isAuthenticatedSelector } from 'store/auth/selectors';
import { PENDING_POSTS } from 'services/connectData/types';
import { POST_FORM_MODEL_PATH, POST_INITIAL_STATE } from './constants';
import { serializePost } from './utils';

export const initializeForm = (post: ?Post) => (dispatch: Dispatch) => {
  if (R.either(R.isNil, R.isEmpty)(post)) {
    return;
  }

  const initialState = R.compose(
    R.pick(R.keys(POST_INITIAL_STATE)),
    R.defaultTo({}),
  )(post);

  dispatch(formActions.load(POST_FORM_MODEL_PATH, initialState));
};

export const savePendingPost = (post: Post | {}) =>
  (dispatch: Dispatch, getState: Function, getFirebase: Function) => {
    const uid = uidSelector(getState());
    return getFirebase().update(`${PENDING_POSTS}/${uid}`, serializePost(post));
  };

const removePendingPost = () =>
  (dispatch: Dispatch, getState: Function, getFirebase: Function) => {
    const uid = uidSelector(getState());
    return getFirebase().remove(`${PENDING_POSTS}/${uid}`);
  };

export const createPost = (post: Post) =>
  (dispatch: Dispatch, getState: Function, getFirebase: Function) => {
    const state = getState();
    const isAuthenticated = isAuthenticatedSelector(getState());

    if (!isAuthenticated) {
      return dispatch(push({
        pathname: '/auth/login',
        search: '?redirect=/p',
      }));
    }

    const userObj = {
      user: uidSelector(state),
    };
    const finalPost = R.compose(
      serializePost,
      R.merge(post),
    )(userObj);

    return getFirebase()
      .push('/posts', finalPost)
      .then(() => dispatch(removePendingPost()))
      .then(() => dispatch(formActions.reset(POST_FORM_MODEL_PATH)));
  };

export const savePost = (postId: string, onSave: ?Function) => (post: Post) =>
  (dispatch: Dispatch, getState: Function, getFirebase: Function) => (
    getFirebase()
      .update(`/posts/${postId}`, post)
      .then(onSave)
  );
