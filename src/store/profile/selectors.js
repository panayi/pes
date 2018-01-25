import * as R from 'ramda';
import { createSelector } from 'reselect';
import { populate, isLoaded } from 'react-redux-firebase';
import * as firebaseConstants from 'constants/firebase';
import * as constants from './constants';

// profileSelector :: State -> Object | Nil
export const profileSelector = R.path([
  ...firebaseConstants.FIREBASE_PATH,
  'profile',
]);

export const populatedProfileSelector = R.compose(
  firebase => populate(firebase, 'profile', constants.PROFILE_POPULATES),
  R.prop(firebaseConstants.FIREBASE_PATH),
);

// isProfileLoadedSelector :: State -> Boolean
export const isProfileLoadedSelector = createSelector(
  profileSelector,
  isLoaded,
);

// profilePropSelector :: ([String], Options) -> State -> Any
//  Options = { populated: Boolean }
export const profilePropSelector = (path, options = {}) =>
  createSelector(
    options.populated ? populatedProfileSelector : profileSelector,
    R.path(path),
  );

// profileEmailSelector :: State -> String | Nil
export const profileEmailSelector = profilePropSelector('email');

export const profileCountryCodeSelector = profilePropSelector([
  'location',
  'address',
  'country',
]);
