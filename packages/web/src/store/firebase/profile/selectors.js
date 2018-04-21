import * as R from 'ramda';
import { createSelector } from 'reselect';
import { isLoaded } from 'react-redux-firebase';
import * as firebaseConfig from '@pesposa/core/src/config/firebase';

// profileSelector :: State -> Object | Nil
export const profileSelector = R.path([
  ...firebaseConfig.FIREBASE_PATH,
  'profile',
]);

// isProfileLoadedSelector :: State -> Boolean
export const isProfileLoadedSelector = createSelector(
  profileSelector,
  isLoaded,
);

// profilePropSelector :: ([String], Options) -> State -> Any
//  Options = { populated: Boolean }
export const profilePropSelector = path =>
  createSelector(profileSelector, R.path(path));

// profileEmailSelector :: State -> String | Nil
export const profileEmailSelector = profilePropSelector(['email']);

export const profilePhoneNumberSelector = profilePropSelector([
  'profile',
  'phoneNumber',
]);

export const profileAdultSelector = profilePropSelector(['adult']);

export const providerIdsSelector = R.compose(
  R.pluck('uid'),
  R.defaultTo([]),
  profilePropSelector(['providerData']),
);
