import * as R from 'ramda';
import { isArray } from 'ramda-adjunct';
import { createSelector } from 'reselect';
import { populate, isLoaded } from 'react-redux-firebase';
import * as firebaseConfig from '@pesposa/core/src/config/firebase';
import propSelector from '@pesposa/core/src/utils/propSelector';
import * as constants from './constants';

// profileSelector :: State -> Object | Nil
export const profileSelector = R.path([
  ...firebaseConfig.FIREBASE_PATH,
  'profile',
]);

export const populatedProfileSelector = R.compose(
  firebase => populate(firebase, 'profile', constants.PROFILE_POPULATES),
  R.prop(firebaseConfig.FIREBASE_PATH),
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
export const profileEmailSelector = profilePropSelector(['email']);

export const profilePhoneNumberSelector = profilePropSelector([
  'profile',
  'phoneNumber',
]);

export const providerIdsSelector = R.compose(
  R.pluck('uid'),
  R.defaultTo([]),
  profilePropSelector(['providerData']),
);

export const isBetaUserSelector = createSelector(
  profileEmailSelector,
  profilePhoneNumberSelector,
  providerIdsSelector,
  R.compose(R.defaultTo([]), propSelector('betaUsers')),
  (email, phoneNumber, providerIds, betaUsers) =>
    R.find(
      R.anyPass([
        betaUser => email && betaUser.email && betaUser.email === email,
        betaUser =>
          phoneNumber &&
          betaUser.phoneNumber &&
          betaUser.phoneNumber === phoneNumber,
        betaUser =>
          isArray(providerIds) &&
          betaUser.providerId &&
          R.contains(betaUser.providerId, providerIds),
      ]),
      betaUsers,
    ),
);
