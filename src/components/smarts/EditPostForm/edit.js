/* @flow */
import * as R from 'ramda';
import { createSelector } from 'reselect';
import { actions as formActions } from 'react-redux-form';
import { MODEL_PATH, INITIAL_STATE } from 'components/organisms/PostForm';
import propsSelector from 'utils/propsSelector';

// ------------------------------------
// Selectors
// ------------------------------------
export const postImagesPathSelector = createSelector(
  R.compose(
    R.prop('postId'),
    propsSelector,
  ),
  postId => `posts/${postId}/images`,
);

// ------------------------------------
// Actions
// ------------------------------------
export const initializeForm = (post: Post) => (dispatch: Dispatch) => {
  const initialState = R.compose(
    R.pick(R.keys(INITIAL_STATE)),
    R.defaultTo({}),
  )(post);

  if (R.either(R.isNil, R.isEmpty)(initialState)) {
    return;
  }

  dispatch(formActions.load(MODEL_PATH, initialState));
};

export const savePost = (postId: string, onSave: ?Function) => (post: Post) =>
  (dispatch: Dispatch, getState: Function, getFirebase: Function) => (
    getFirebase()
      .update(`/posts/${postId}`, post)
      .then(onSave)
  );

export const actions = {
  initializeForm,
  savePost,
};
