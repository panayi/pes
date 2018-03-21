import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import authConfig from '@pesposa/core/src/config/auth';
import env from '@pesposa/core/src/config/env';
import * as firebaseConfig from '@pesposa/core/src/config/firebase';
import createAuthProvider from 'lib/firebase/createAuthProvider';
import api from 'services/api';
import firebaseApi from 'services/firebase';
import { migrateAnonymousUser } from 'store/anonymousUserToken/actions';
import { actions as modalActions } from 'store/modals';
import { actions as loginActions } from 'store/login';
import { actions as locationActions } from 'store/firebase/profile/location';
import {
  actions as profileActions,
  utils as profileUtils,
} from 'store/firebase/profile';
import * as selectors from './selectors';

export const setCurrentUserInfo = () => async (dispatch, getState) => {
  const state = getState();
  const uid = selectors.uidSelector(state);
  const token = selectors.tokenSelector(state);

  if (isNilOrEmpty(uid) || isNilOrEmpty(token)) {
    return null;
  }

  if (!process.browser) {
    return null;
  }

  let geoposition = null;
  try {
    geoposition = await dispatch(locationActions.getCurrentPosition());
  } catch (error) {
    console.warn(error); // eslint-disable-line no-console
  }

  return dispatch(api.setCurrentUserInfo({ geoposition }, { token }));
};

export const handleAuthStateChanged = async (authData, firebase, dispatch) => {
  if (!process.browser) {
    return null;
  }

  // If user is not logged in => login anonymously
  if (isNilOrEmpty(authData)) {
    return dispatch(firebaseApi.auth.loginAnonymously());
  }
  // Otherwise, user was just logged in

  // Save session to make it available on SSR
  authData.getIdToken().then(token => {
    dispatch(api.createSession(token));
  });

  if (!authData.isAnonymous) {
    // Migrate when user has just logged in and not anonymous
    await dispatch(migrateAnonymousUser());
  }

  return dispatch(setCurrentUserInfo());
};

export const login = credentials => async dispatch => {
  dispatch(loginActions.loginStarted());

  try {
    await dispatch(firebaseApi.auth.login(credentials));
    dispatch(loginActions.loginSucceeded());
  } catch (error) {
    dispatch(loginActions.loginFailed());
    throw error;
  }
};

export const loginWithPhoneNumber = (
  phoneNumber,
  applicationVerifier,
) => async (dispatch, getState, getFirebase) => {
  const isAuthenticated = selectors.isAuthenticatedSelector(getState());
  dispatch(loginActions.loginStarted());

  try {
    const confirmationResult = isAuthenticated
      ? await getFirebase()
          .auth()
          .signInWithPhoneNumber(phoneNumber, applicationVerifier)
      : await dispatch(
          firebaseApi.auth.login({
            phoneNumber,
            applicationVerifier,
          }),
        );
    dispatch(loginActions.loginReset());
    return confirmationResult;
  } catch (error) {
    dispatch(loginActions.loginFailed());
    throw error;
  }
};

export const validateSmsCode = (code, confirmationResult) => async (
  dispatch,
  getState,
  getFirebase,
) => {
  const isAuthenticated = selectors.isAuthenticatedSelector(getState());

  dispatch(loginActions.loginStarted());

  try {
    if (isAuthenticated) {
      const credential = getFirebase().auth.PhoneAuthProvider.credential(
        confirmationResult.verificationId,
        code,
      );
      const user = await getFirebase()
        .auth()
        .currentUser.linkWithCredential(credential);
      const newUser = profileUtils.profileFactory(user, user);
      await dispatch(profileActions.updateProfile(newUser));
    } else {
      await confirmationResult.confirm(code);
    }
    dispatch(loginActions.loginSucceeded());
  } catch (error) {
    dispatch(loginActions.loginFailed());
    throw error;
  }
};

export const linkProvider = providerId => async (
  dispatch,
  getState,
  getFirebase,
) => {
  if (providerId === firebaseConfig.PROVIDER_IDS.phone) {
    dispatch(
      modalActions.openModal('login', { contentProps: { phoneOnly: true } }),
    );
    return;
  }

  const firebase = getFirebase();
  const provider = createAuthProvider(
    firebase,
    providerId,
    authConfig[providerId].scopes,
  );

  const result = await firebase.auth().currentUser.linkWithPopup(provider);
  const user = R.prop('user', result);
  const newUser = profileUtils.profileFactory(user, user);
  dispatch(profileActions.updateProfile(newUser));
};

export const logout = () => async (dispatch, getState, getFirebase) => {
  await getFirebase().logout();

  if (env.betaEnabled) {
    window.location.href = '/beta';
  }
};
