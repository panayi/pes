/* @flow */
import * as R from 'ramda';
import { createSelector } from 'reselect';
import propsSelector from 'utils/propsSelector';
import { PENDING_POSTS } from 'services/connectData/types';
import { uidSelector } from '../auth/selectors';

// postImagesPathSelector :: (_, Props) -> Object | Nil
export const postImagesPathSelector = createSelector(
  R.compose(R.prop('postId'), propsSelector),
  postId => `posts/${postId}/images`,
);

// pendingPostImagesSelector :: State -> Object | Nil
export const pendingPostImagesPathSelector = createSelector(
  uidSelector,
  R.unless(R.isNil, uid => `${PENDING_POSTS}/${uid}/images`),
);

// pendingPostSelector :: (_, Props) -> Post | Nil
//   Post = Object
export const pendingPostSelector = createSelector(
  propsSelector,
  R.prop('pendingPost'),
);
