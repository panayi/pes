import * as R from 'ramda';
import { combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';
import { actionTypes, getFirebase as g } from 'react-redux-firebase';
import profileFactory from './helpers/profileFactory';
import { anonymousProfileSelector } from './auth.selectors';
import linkedAccountsReducer from './Link/link';
import withPhoneNumberReducer from './Login/WithPhoneNumber/withPhoneNumber';

// ------------------------------------
// Constants
// ------------------------------------
const RESET = 'auth/anonymousProfile/RESET';

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = null;

const anonymousProfileReducer = handleActions({
  [actionTypes.PROFILE_UPDATE_SUCCESS]: (state, { payload }) => {
    const { currentUser } = g().auth();

    if (currentUser && currentUser.isAnonymous) {
      return payload;
    }

    return state;
  },

  [RESET]: R.always(initialState),
}, initialState);

export default combineReducers({
  anonymousProfile: anonymousProfileReducer,
  linkedAccounts: linkedAccountsReducer,
  withPhoneNumber: withPhoneNumberReducer,
});

// ------------------------------------
// Actions
// ------------------------------------
const reset = createAction(RESET);

export const maybeMergeAnonymousProfile = () => (dispatch, getState, getFirebase) => {
  const state = getState();
  const anonymousProfile = anonymousProfileSelector(state);

  if (!anonymousProfile) {
    return;
  }

  // Copy anonymousProfile to logged-in (non-anoymous) user profile
  // Note that this will override keys that already exist in user profile
  getFirebase().updateProfile(anonymousProfile).then(() => dispatch(reset()));

  // TODO: Need to also delete the anonymous User and profile
  // No idea how to do that...
};

export const updateProfile = user => (dispatch, getState, getFirebase) => {
  const firebase = getFirebase();

  firebase.updateProfile(profileFactory(user));
};

export const actions = {
  maybeMergeAnonymousProfile,
  updateProfile,
};

export * from './auth.selectors';
