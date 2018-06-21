/*
|--------------------------------------------------------------------------
| Read
|--------------------------------------------------------------------------
*/
export const getProviders = (firebase, email) =>
  firebase.auth().fetchProvidersForEmail(email);

/*
|--------------------------------------------------------------------------
| Write
|--------------------------------------------------------------------------
*/
export const login = async (firebase, credentials) =>
  firebase.login(credentials);

export const loginAnonymously = async firebase =>
  firebase.auth().signInAnonymously();

export const link = (firebase, credentials) =>
  firebase.linkWithCredential(credentials);
