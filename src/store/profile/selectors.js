import * as R from 'ramda';
import { createSelector } from 'reselect';
import { isLoaded } from 'react-redux-firebase';
import * as firebaseConstants from 'constants/firebase';

// profileSelector :: State -> Object | Nil
export const profileSelector = R.path([
  ...firebaseConstants.FIREBASE_PATH,
  'profile',
]);

// isProfileLoadedSelector :: State -> Boolean
export const isProfileLoadedSelector = createSelector(
  profileSelector,
  isLoaded,
);

export const isAdminSelector = createSelector(
  profileSelector,
  R.compose(R.path(['roles', 'admin']), R.defaultTo({})),
);

// profilePropSelector :: [String] -> State -> Any
export const profilePropSelector = path =>
  createSelector(profileSelector, R.compose(R.path(path), R.defaultTo({})));

// profileEmailSelector :: State -> String | Nil
export const profileEmailSelector = profilePropSelector('email');
