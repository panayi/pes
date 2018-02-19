import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { auth as authConfig, firebase as firebaseConfig } from 'pesposa-config';
import createAuthProvider from 'lib/firebase/createAuthProvider';
import api from 'services/api';
import { migrateAnonymousUser } from 'store/anonymousUserToken/actions';
import { actions as locationActions } from 'store/firebase/profile/location';
import {
  actions as profileActions,
  utils as profileUtils,
} from 'store/firebase/profile';
import { modals } from 'store/modals';
import * as selectors from './selectors';

export const setCurrentUserInfo = () => async (dispatch, getState) => {
  const state = getState();
  const uid = selectors.uidSelector(state);
  const token = selectors.tokenSelector(state);

  if (isNilOrEmpty(uid) || isNilOrEmpty(token)) {
    return null;
  }

  let geoposition = null;
  try {
    geoposition = await dispatch(locationActions.getCurrentPosition());
  } catch (error) {
    console.warn(error); // eslint-disable-line no-console
  }

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

export const loginWithPhoneNumber = (
  phoneNumber,
  applicationVerifier,
) => async (dispatch, getState, getFirebase) => {
  const isAuthenticated = selectors.isAuthenticatedSelector(getState());

  if (isAuthenticated) {
    return getFirebase()
      .auth()
      .signInWithPhoneNumber(phoneNumber, applicationVerifier);
  }

  return dispatch(
    api.auth.login({
      phoneNumber,
      applicationVerifier,
    }),
  );
};

export const validateSmsCode = (code, confirmationResult) => async (
  dispatch,
  getState,
  getFirebase,
) => {
  const isAuthenticated = selectors.isAuthenticatedSelector(getState());

  if (isAuthenticated) {
    const credential = getFirebase().auth.PhoneAuthProvider.credential(
      confirmationResult.verificationId,
      code,
    );
    const result = await getFirebase()
      .auth()
      .currentUser.linkWithCredential(credential);
    const user = R.prop('user', result);
    const newUser = profileUtils.profileFactory(user, user);
    dispatch(profileActions.updateProfile(newUser));
  }

  return confirmationResult.confirm(code);
};

export const linkProvider = providerId => async (
  dispatch,
  getState,
  getFirebase,
) => {
  if (providerId === firebaseConfig.PROVIDER_IDS.phone) {
    dispatch(modals.login.showAction({ phoneOnly: true }));
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
