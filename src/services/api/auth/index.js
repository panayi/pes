export const login = credentials => (dispatch, getState, getFirebase) =>
  getFirebase().login(credentials);

export const getProviders = email => (dispatch, getState, getFirebase) =>
  getFirebase()
    .auth()
    .fetchProvidersForEmail(email);
