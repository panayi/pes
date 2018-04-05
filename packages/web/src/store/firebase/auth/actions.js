import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import authConfig from '@pesposa/core/src/config/auth';
import env from '@pesposa/core/src/config/env';
import * as firebaseConfig from '@pesposa/core/src/config/firebase';
import * as modelPaths from '@pesposa/core/src/config/modelPaths';
import createAuthProvider from 'lib/firebase/createAuthProvider';
import firebaseApi from 'services/firebase';
import api from 'services/api';
import { migrateAnonymousUser } from 'store/anonymousUserToken/actions';
import { actions as modalActions } from 'store/modals';
import { actions as loginActions } from 'store/login';
import {
  actions as profileActions,
  utils as profileUtils,
} from 'store/firebase/profile';
import * as selectors from './selectors';

// Hacky code!
// TODO: refactor or remove soon
const isInBetaPage = () => R.equals(window.location.pathname, '/beta');

export const handleAuthStateChanged = async (authData, firebase, dispatch) => {
  if (!process.browser) {
    return;
  }

  // If user is not logged in => login anonymously
  if (isNilOrEmpty(authData)) {
    if (!isInBetaPage()) {
      dispatch(firebaseApi.auth.loginAnonymously());
    }
    return;
  }

  if (authData.isAnonymous) {
    return;
  }

  // Otherwise, user was just logged in

  // Migrate when user has just logged in and not anonymous
  await dispatch(migrateAnonymousUser());
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
    if (error.code === 'auth/credential-already-in-use') {
      // TODO: Use a proper dialog and provide a better UX (e.g. a button to click for requesting merge accounts)
      /* eslint-disable no-alert */
      window.alert(
        'This phone number is already associated with another user. Please contact support: contact-us@pesposa.com',
      );
      /* eslint-enable no-alert */
    }
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
  await getFirebase().logout();

  if (env.betaEnabled && !isInBetaPage()) {
    window.location.href = '/beta';
  }
};

// BETA

export const createBetaUser = ({ code, email }) => async (
  dispatch,
  getState,
  getFirebase,
) => {
  const token = selectors.tokenSelector(getState());
  const response = await dispatch(api.createBetaUser({ code, email }, token));

  if (response.ok) {
    // Refetch beta users
    await getFirebase()
      .ref(modelPaths.BETA_USERS.string)
      .once('value');

    return true;
  }

  return false;
};
