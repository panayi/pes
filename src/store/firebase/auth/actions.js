import { isNilOrEmpty } from 'ramda-adjunct';
import api from 'services/api';
import { migrateAnonymousUser } from 'store/anonymousUserToken/actions';
import { actions as locationActions } from 'store/firebase/profile/location';
import * as selectors from './selectors';

export const setCurrentUserInfo = () => async (dispatch, getState) => {
  const state = getState();
  const uid = selectors.uidSelector(state);
  const token = selectors.tokenSelector(state);

  if (isNilOrEmpty(uid) || isNilOrEmpty(token)) {
    return null;
  }

  const geoposition = await dispatch(locationActions.getCurrentPosition());

  return dispatch(api.app.setCurrentUserInfo({ geoposition }, { token }));
};

export const handleAuthStateChanged = async (authData, firebase, dispatch) => {
  // If user is not logged in => login anonymously
  if (isNilOrEmpty(authData)) {
    dispatch(api.auth.loginAnonymously());
    return;
  }

  // Otherwise, user was just logged in

  if (!authData.isAnonymous) {
    // Migrate when user has just logged in and not anonymous
    await dispatch(migrateAnonymousUser());
  }

  await dispatch(setCurrentUserInfo());
};

export const login = credentials => dispatch =>
  dispatch(api.auth.login(credentials));

export const validateSmsCode = (code, confirmationResult) => () =>
  confirmationResult.confirm(code);
