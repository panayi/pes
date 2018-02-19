export const login = credentials => async (dispatch, getState, getFirebase) =>
  getFirebase().login(credentials);

export const loginAnonymously = () => (dispatch, getState, getFirebase) =>
  getFirebase()
    .auth()
    .signInAnonymously();

export const link = credentials => (dispatch, getState, getFirebase) =>
  getFirebase().linkWithCredential(credentials);

export const getProviders = email => (dispatch, getState, getFirebase) =>
  getFirebase()
    .auth()
    .fetchProvidersForEmail(email);
