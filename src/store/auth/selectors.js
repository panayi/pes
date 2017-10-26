import * as R from 'ramda';
import { createSelector } from 'reselect';
import { isLoaded } from 'react-redux-firebase';
import { FIREBASE_PATH } from 'services/firebase/modelConnections';

// ------------------------------------
// Constants
// ------------------------------------
const FIREBASE_AUTH_PATH = [...FIREBASE_PATH, 'auth'];

// ------------------------------------
// Selectors
// ------------------------------------

// authErrorSelector :: State -> Object | Nil
export const authErrorSelector = R.path([...FIREBASE_PATH, 'authError']);

// firebaseSelector :: State -> Object
const firebaseAuthSelector = R.compose(
  R.defaultTo({}),
  R.path(FIREBASE_AUTH_PATH),
);

// isLoadedSelector :: State -> Boolean | Nil
const isLoadedSelector = createSelector(
  firebaseAuthSelector,
  isLoaded,
);

// isInitializingSelector :: State -> Boolean | Nil
const isInitializingSelector = R.path([...FIREBASE_PATH, 'isInitializing']);

export const uidSelector = createSelector(
  firebaseAuthSelector,
  R.prop('uid'),
);

// hasUidSelector :: State -> String | Nil
const hasUidSelector = createSelector(
  uidSelector,
  R.compose(
    R.not,
    R.isNil,
  ),
);

// isAnonymousSelector :: State -> Boolean | Nil
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

export const isAdminSelector = createSelector(
  profileSelector,
  R.compose(
    R.path(['roles', 'admin']),
    R.defaultTo({}),
  ),
);

// isProfileLoadedSelector :: State -> Boolean
export const isProfileLoadedSelector = createSelector(
  profileSelector,
  isLoaded,
);

// profilePropSelector :: [String] -> State -> Any
export const profilePropSelector = path => createSelector(
  profileSelector,
  R.compose(
    R.path(path),
    R.defaultTo({}),
  ),
);

// profileEmailSelector :: State -> String | Nil
export const profileEmailSelector = profilePropSelector('email');

export const tokenSelector = createSelector(
  firebaseAuthSelector,
  R.path(['stsTokenManager', 'accessToken']),
);

export const isUserSelector = userSelector => createSelector(
  isAuthenticatedSelector,
  uidSelector,
  userSelector,
  (isAuthenticated, currentUserId, userId) => isAuthenticated && R.equals(currentUserId, userId),
);