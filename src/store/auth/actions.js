import { isNilOrEmpty } from 'ramda-adjunct';
import api from 'services/api';
import { maybeSetAnonymousUserId } from './anonymousUserId/actions';

export const login = credentials => async dispatch => {
  await dispatch(api.auth.login(credentials));
  dispatch(maybeSetAnonymousUserId());
};

export const handleAuthStateChanged = (authData, firebase) => {
  // If user is not logged in => login anonymously
  if (isNilOrEmpty(authData)) {
    firebase.auth().signInAnonymously();
  }
};
