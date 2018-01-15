import * as R from 'ramda';
import { createSelector } from 'reselect';
import { isLoaded } from 'react-redux-firebase';
import * as firebaseConstants from 'constants/firebase';

const FIREBASE_AUTH_PATH = [...firebaseConstants.FIREBASE_PATH, 'auth'];

// authErrorSelector :: State -> Object | Nil
export const authErrorSelector = R.path([
  ...firebaseConstants.FIREBASE_PATH,
  'authError',
]);

// firebaseSelector :: State -> Object
const firebaseAuthSelector = R.compose(
  R.defaultTo({}),
  R.path(FIREBASE_AUTH_PATH),
);

// isLoadedSelector :: State -> Boolean | Nil
const isLoadedSelector = createSelector(firebaseAuthSelector, isLoaded);

// isInitializingSelector :: State -> Boolean | Nil
const isInitializingSelector = R.path([
  ...firebaseConstants.FIREBASE_PATH,
  'isInitializing',
]);

export const uidSelector = createSelector(firebaseAuthSelector, R.prop('uid'));

// hasUidSelector :: State -> String | Nil
export const hasUidSelector = createSelector(
  uidSelector,
  R.compose(R.not, R.isNil),
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
  R.useWith(R.or, [R.identity, R.not]),
);

// isAuthenticatedSelector :: State -> Boolean
// Equals to: !isAuthenticatingSelector && hasUidSelector
export const isAuthenticatedSelector = createSelector(
  isAuthenticatingSelector,
  hasUidSelector,
  isAnonymousSelector,
  (isAuthenticating, hasUid, isAnonymous) =>
    !isAuthenticating && hasUid && !isAnonymous,
);

// isNotAuthenticatedSelector :: State -> Boolean
// Equals to: !isAuthenticatingSelector && !hasUidSelector
export const isNotAuthenticatedSelector = createSelector(
  isAuthenticatingSelector,
  hasUidSelector,
  isAnonymousSelector,
  (isAuthenticating, hasUid, isAnonymous) =>
    !isAuthenticating && (!hasUid || isAnonymous),
);

export const tokenSelector = createSelector(
  firebaseAuthSelector,
  R.path(['stsTokenManager', 'accessToken']),
);

export const isUserSelector = userSelector =>
  createSelector(
    isAuthenticatedSelector,
    uidSelector,
    userSelector,
    (isAuthenticated, currentUserId, userId) =>
      isAuthenticated && R.equals(currentUserId, userId),
  );
