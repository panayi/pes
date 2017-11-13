import * as R from 'ramda';
import capitalize from 'lodash.capitalize';
import * as constants from './constants';

// Based on https://github.com/prescottprue/react-redux-firebase/blob/master/src/utils/auth.js
// as it is not exposed by react-redux-firebase
export const createAuthProvider = (firebase, providerName, scopes) => {
  const provider = new firebase.auth[`${capitalize(providerName)}AuthProvider`]();

  // Handle providers without scopes
  if (providerName.toLowerCase() === 'twitter' || !R.is(Function, provider.addScope)) {
    return provider;
  }

  provider.addScope('email');

  if (scopes) {
    if (R.is(Array, scopes)) {
      scopes.forEach((scope) => {
        provider.addScope(scope);
      });
    }
    if (R.is(String, scopes)) {
      provider.addScope(scopes);
    }
  }

  return provider;
};

// getPropInProviderData :: String -> Any
const getPropInProviderData = propKey => R.compose(
  R.find(R.identity),
  R.pluck(propKey),
  R.propOr([], 'providerData'),
);

// getDisplayName :: User -> String | Nil
const getDisplayName = R.converge(R.or, [
  getPropInProviderData('displayName'),
  R.propOr(null, 'email'),
]);

// getPhotoUrl :: User -> String | Nil
const getPhotoUrl = R.compose(
  R.defaultTo(null),
  getPropInProviderData('photoURL'),
);

// profileFactory :: User -> Object
export const profileFactory = user => ({
  email: user.email,
  providerData: user.providerData,
  profile: {
    displayName: getDisplayName(user),
    avatarUrl: getPhotoUrl(user),
  },
});

export const getDataUrl = path =>
  `${constants.FIREBASE_CONSOLE_BASE_URL}/${constants.FIREBASE_PROJECT_ID}/database/data/${path}`;
