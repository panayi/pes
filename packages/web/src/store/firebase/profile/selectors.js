import * as R from 'ramda';
import { createSelector } from 'reselect';
import { populate, isLoaded } from 'react-redux-firebase';
import * as firebaseConfig from '@pesposa/core/src/config/firebase';
import * as localeConfig from '@pesposa/core/src/config/locale';
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

export const profilePhoneNumberSelector = createSelector(
  profileSelector,
  R.compose(
    R.prop('phoneNumber'),
    R.defaultTo({}),
    R.find(R.propEq('providerId', firebaseConfig.PROVIDER_IDS.phone)),
    R.propOr([], 'providerData'),
  ),
);

export const profileCountryCodeSelector = profilePropSelector([
  'location',
  'address',
  'country',
]);

export const profileLocaleSelector = R.compose(
  R.defaultTo(localeConfig.DEFAULT_LOCALE),
  profilePropSelector(['locale'], { populated: true }),
);