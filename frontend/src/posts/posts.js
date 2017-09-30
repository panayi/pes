import R from 'ramda';
import { createSelector } from 'reselect';
import { DATA_PATH } from '../firebase/firebase';

// ------------------------------------
// Selectors
// ------------------------------------

// postsSelector :: State -> Object
export const postsSelector = R.compose(
  // FIXME: For some reason when querying (i.e., when categoryName is defined),
  // it returns an object instead of an array. Below line ensures `posts` is an array.
  R.values,
  R.path([...DATA_PATH, 'posts']),
);

const postByCategorySelectors = {};

export const postsByCategorySelector = (categoryName) => {
  if (postByCategorySelectors[categoryName]) {
    return postByCategorySelectors[categoryName];
  }

  if (R.isNil(categoryName)) {
    return postsSelector;
  }

  postByCategorySelectors[categoryName] = createSelector(
    postsSelector,
    R.reject(post => !post || (categoryName && !R.equals(post.category, categoryName))),
  );

  return postByCategorySelectors[categoryName];
};
