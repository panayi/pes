import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { auth as authConfig } from 'pesposa-config';
import createAuthProvider from 'lib/firebase/createAuthProvider';
import api from 'services/api';
import { migrateAnonymousUser } from 'store/anonymousUserToken/actions';
import { actions as locationActions } from 'store/firebase/profile/location';
import {
  actions as profileActions,
  selectors as profileSelectors,
} from 'store/firebase/profile';
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

export const login = credentials => async dispatch => {
  await dispatch(api.auth.login(credentials));
  return dispatch(setCurrentUserInfo());
};

export const validateSmsCode = (code, confirmationResult) => async () =>
  confirmationResult.confirm(code);

export const fetchLinkedProviders = () => (dispatch, getState) => {
  const email = profileSelectors.profileEmailSelector(getState());

  if (R.isNil(email)) {
    return null;
  }

  return dispatch(api.auth.getProviders(email));
};

export const linkProvider = providerId => async (
  dispatch,
  getState,
  getFirebase,
) => {
  const firebase = getFirebase();
  const provider = createAuthProvider(
    firebase,
    providerId,
    authConfig[providerId].scopes,
  );

  const result = await firebase.auth().currentUser.linkWithPopup(provider);
  const providerData = R.path(['user', 'providerData'], result);
  dispatch(profileActions.updateProfile({ providerData }));
};
