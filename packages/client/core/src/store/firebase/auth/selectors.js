import * as R from 'ramda';
import { isNotNil } from 'ramda-adjunct';
import { createSelector } from 'reselect';
import { isLoaded } from 'react-redux-firebase';
import * as firebaseConfig from '@pesposa/core/src/config/firebase';
import decodeJwt from '@pesposa/core/src/utils/decodeJwt';

const FIREBASE_AUTH_PATH = [...firebaseConfig.FIREBASE_PATH, 'auth'];

// authErrorSelector :: State -> Object | Nil
export const authErrorSelector = R.path([
  ...firebaseConfig.FIREBASE_PATH,
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
  ...firebaseConfig.FIREBASE_PATH,
  'isInitializing',
]);

export const uidSelector = createSelector(firebaseAuthSelector, R.prop('uid'));

// hasUidSelector :: State -> String | Nil
export const hasUidSelector = createSelector(uidSelector, isNotNil);

// isAnonymousSelector :: State -> Boolean | Nil
export const isAnonymousSelector = createSelector(
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

export const isCurrentUserSelector = userIdSelector =>
  createSelector(
    isAuthenticatedSelector,
    uidSelector,
    userIdSelector,
    (isAuthenticated, currentUserId, userId) =>
      isAuthenticated && R.equals(currentUserId, userId),
  );

export const isAdminSelector = createSelector(
  tokenSelector,
  R.compose(R.prop('admin'), R.defaultTo({}), decodeJwt),
);
