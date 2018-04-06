import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import * as firebaseConfig from '@pesposa/core/src/config/firebase';
import * as auth from '@pesposa/core/src/client/auth';
import * as api from '@pesposa/core/src/client/api';
import authConfig from '../../../config/auth';
import createAuthProvider from '../../../lib/firebase/createAuthProvider';
import { actions as modalActions } from '../../../store/modals';
import { actions as loginActions } from '../../../store/login';
import { track } from '../../../services/mixpanel';
import {
  actions as profileActions,
  utils as profileUtils,
} from '../../../store/firebase/profile';
import { migrateAnonymousUser } from '../../../store/anonymousUserToken/actions';
import * as selectors from './selectors';

const setUserInfo = () => (dispatch, getState) => {
  const token = selectors.tokenSelector(getState());

  return api.setUserInfo(token);
};

export const handleAuthStateChanged = async (authData, firebase, dispatch) => {
  if (!process.browser) {
    return;
  }

  // If user is not logged in => login anonymously
  if (isNilOrEmpty(authData)) {
    auth.loginAnonymously(firebase);
    return;
  }

  if (authData.isAnonymous) {
    return;
  }

  // Otherwise, user was just logged in

  // Migrate when user has just logged in (not anonymously)
  await dispatch(migrateAnonymousUser());
  await dispatch(setUserInfo());

  track('login');
};

export const login = credentials => async (dispatch, getState, getFirebase) => {
  dispatch(loginActions.loginStarted());

  try {
    await auth.login(getFirebase(), credentials);
    dispatch(loginActions.loginSucceeded());
  } catch (error) {
    dispatch(loginActions.loginFailed());
    if (window.Rollbar) {
      window.Rollbar.error(error);
    }
    throw error;
  }
};

export const loginWithPhoneNumber = (
  phoneNumber,
  applicationVerifier,
) => async (dispatch, getState, getFirebase) => {
  const firebase = getFirebase();
  const isAuthenticated = selectors.isAuthenticatedSelector(getState());
  dispatch(loginActions.loginStarted());

  try {
    const confirmationResult = isAuthenticated
      ? await firebase
          .auth()
          .signInWithPhoneNumber(phoneNumber, applicationVerifier)
      : await auth.login(firebase, {
          phoneNumber,
          applicationVerifier,
        });
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
  const firebase = getFirebase();
  const isAuthenticated = selectors.isAuthenticatedSelector(getState());

  dispatch(loginActions.loginStarted());

  try {
    if (isAuthenticated) {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        confirmationResult.verificationId,
        code,
      );
      const user = await firebase
        .auth()
        .currentUser.linkWithCredential(credential);
      const newUser = profileUtils.profileFactory(user, user);
      await dispatch(profileActions.updateProfile(newUser));
    } else {
      await confirmationResult.confirm(code);
    }
    dispatch(loginActions.loginSucceeded());
  } catch (error) {
    let errorMsg;

    if (error.code === 'auth/credential-already-in-use') {
      errorMsg =
        'Cannot link this phone number as it is already associated with another Pesposa account.';
    } else if (error.code === 'auth/invalid-verification-code') {
      errorMsg = 'Wrong code. Try again.';
    }
    dispatch(loginActions.loginFailed(errorMsg));
    throw new Error(errorMsg);
  }
};

export const linkProvider = providerId => async (
  dispatch,
  getState,
  getFirebase,
) => {
  if (providerId === firebaseConfig.PROVIDER_IDS.phone) {
    dispatch(
      modalActions.openModal('login', {
        phoneOnly: true,
        title: 'Connect your phone number',
      }),
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
  getFirebase().logout();
};
