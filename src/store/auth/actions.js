import { isNilOrEmpty } from 'ramda-adjunct';
import api from 'services/api';
import { migrateAnonymousUser } from './anonymousUserToken/actions';

export const handleAuthStateChanged = (authData, firebase) => {
  // If user is not logged in => login anonymously
  if (isNilOrEmpty(authData)) {
    firebase.auth().signInAnonymously();
  }
};

export const login = credentials => async dispatch => {
  try {
    const result = await dispatch(api.auth.login(credentials));
    dispatch(migrateAnonymousUser());
    return result;
  } catch (error) {
    throw error;
  }
};

export const validateSmsCode = (code, confirmationResult) => () => confirmationResult.confirm(code);
