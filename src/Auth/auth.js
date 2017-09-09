import R from 'ramda';
import { createSelector } from 'reselect';
import { combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';
import { actionTypes, getFirebase as g } from 'react-redux-firebase';
import { FIREBASE_PATH } from '../Firebase/firebase';

// ------------------------------------
// Constants
// ------------------------------------
const RESET = 'auth/anonymousProfile/RESET';
const FIREBASE_AUTH_PATH = [...FIREBASE_PATH, 'auth'];

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
});

// ------------------------------------
// Selectors
// ------------------------------------

// anonymousProfileSelector :: State -> Object | Nil
const anonymousProfileSelector = R.path(['auth', 'anonymousProfile']);

// authErrorSelector :: State -> Object | Nil
export const authErrorSelector = R.path([...FIREBASE_PATH, 'authError']);

// firebaseSelector :: State -> Object
const firebaseAuthSelector = R.compose(
  R.defaultTo({}),
  R.path(FIREBASE_AUTH_PATH),
);

// isLoadedSelector :: State -> Maybe(Boolean)
const isLoadedSelector = createSelector(
  firebaseAuthSelector,
  R.prop('isLoaded'),
);

// isInitializingSelector :: State -> Maybe(Boolean)
const isInitializingSelector = R.path([...FIREBASE_PATH, 'isInitializing']);

export const uidSelector = createSelector(
  firebaseAuthSelector,
  R.prop('uid'),
);

// hasUidSelector :: State -> Maybe(String)
const hasUidSelector = createSelector(
  uidSelector,
  R.compose(
    R.not,
    R.isNil,
  ),
);

const isAnonymousSelector = createSelector(
  firebaseAuthSelector,
  R.prop('isAnonymous'),
);

// isAuthenticatingSelector :: State -> Boolean
export const isAuthenticatingSelector = createSelector(
  isInitializingSelector,
  isLoadedSelector,
  R.useWith(R.or, [
    R.identity,
    R.not,
  ]),
);

// isAuthenticatedSelector :: State -> Boolean
// Equals to: !isAuthenticatingSelector && hasUidSelector
export const isAuthenticatedSelector = createSelector(
  isAuthenticatingSelector,
  hasUidSelector,
  isAnonymousSelector,
  (isAuthenticating, hasUid, isAnonymous) => (
    !isAuthenticating && hasUid && !isAnonymous
  ),
);

// isNotAuthenticatedSelector :: State -> Boolean
// Equals to: !isAuthenticatingSelector && !hasUidSelector
export const isNotAuthenticatedSelector = createSelector(
  isAuthenticatingSelector,
  hasUidSelector,
  isAnonymousSelector,
  (isAuthenticating, hasUid, isAnonymous) => (
    !isAuthenticating && (!hasUid || isAnonymous)
  ),
);

// profileSelector :: State -> Object | Nil
export const profileSelector = R.path([...FIREBASE_PATH, 'profile']);

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
