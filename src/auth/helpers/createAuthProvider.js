import * as R from 'ramda';
import capitalize from 'lodash.capitalize';

// Based on https://github.com/prescottprue/react-redux-firebase/blob/master/src/utils/auth.js
// as it is not exposed by react-redux-firebase
export default (firebase, providerName, scopes) => {
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
