import * as R from 'ramda';
import { firebase as firebaseConfig } from 'pesposa-config';

// Based on https://github.com/prescottprue/react-redux-firebase/blob/master/src/utils/auth.js
// as it is not exposed by react-redux-firebase
const createAuthProvider = (firebase, providerName, scopes) => {
  const provider = new firebase.auth[
    firebaseConfig.FIREBASE_AUTH_PROVIDER_CLASS[providerName]
  ]();

  // Handle providers without scopes
  if (
    providerName.toLowerCase() === 'twitter' ||
    !R.is(Function, provider.addScope)
  ) {
    return provider;
  }

  provider.addScope('email');

  if (scopes) {
    if (R.is(Array, scopes)) {
      scopes.forEach(scope => {
        provider.addScope(scope);
      });
    }
    if (R.is(String, scopes)) {
      provider.addScope(scopes);
    }
  }

  return provider;
};

export default createAuthProvider;
