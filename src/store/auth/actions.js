import { isNilOrEmpty } from 'ramda-adjunct';
import api from 'services/api';

export const login = credentials => dispatch =>
  dispatch(api.auth.login(credentials));

export const handleAuthStateChanged = (authData, firebase) => {
  if (isNilOrEmpty(authData)) {
    firebase.auth().signInAnonymously();
  }
};
