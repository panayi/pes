import R from 'ramda';
import { createSelector } from 'reselect';
import { actions as formActions } from 'react-redux-form';
import { uidSelector } from '../../Auth/auth';
import { FIREBASE_PATH } from '../../Firebase/firebase';
import { MODEL_PATH, INITIAL_STATE } from '../Form';
import type { Props } from './types';

// ------------------------------------
// Selectors
// ------------------------------------

// pendingPostSelector :: State -> Object
export const pendingPostSelector = R.path([...FIREBASE_PATH, 'profile', 'pendingPost']);

// currentUserPathSelector :: State -> String
export const currentUserPathSelector = createSelector(
  uidSelector,
  R.compose(
    uid => `users/${uid}`,
    R.defaultTo(''),
  ),
);

// pendingPostPathSelector :: State -> String
export const pendingPostPathSelector = createSelector(
  currentUserPathSelector,
  R.compose(
    R.concat(R.__, '/pendingPost'),
    R.defaultTo(''),
  ),
);

// pendingPostImagesPathSelector :: State -> String
export const pendingPostImagesPathSelector = createSelector(
  pendingPostPathSelector,
  R.compose(
    R.concat(R.__, '/images'),
    R.defaultTo(''),
  ),
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
export const createPost = (props: Props) => (post: Post) =>
  (dispatch: Dispatch, getState: Function) => {
    const { firebase, onCreate } = props;
    // FIXME: if for some reason pendingPostPath is nil,
    // this will delete everything!
    const pendingPostPath = pendingPostPathSelector(getState());

    firebase
      .push('/posts', post)
      .then(() => {
        firebase.set(pendingPostPath, {});
      })
      .then(() => dispatch(formActions.load(MODEL_PATH, {})))
      .then(onCreate);
  };

export const savePendingPost = (props: Props) => (post: Post) =>
  (dispatch: Dispatch, getState: Function) => {
    const pendingPostPath = pendingPostPathSelector(getState());
    props.firebase.update(pendingPostPath, post);
  };

export const actions = {
  initializeForm,
  createPost,
  savePendingPost,
};
