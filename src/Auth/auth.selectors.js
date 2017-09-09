import R from 'ramda';
import { createSelector } from 'reselect';
import { FIREBASE_PATH } from '../Firebase/firebase';

// ------------------------------------
// Constants
// ------------------------------------
const FIREBASE_AUTH_PATH = [...FIREBASE_PATH, 'auth'];

// ------------------------------------
// Selectors
// ------------------------------------

// anonymousProfileSelector :: State -> Object | Nil
export const anonymousProfileSelector = R.path(['auth', 'anonymousProfile']);

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

// profilePropSelector :: String -> State -> Any
const profilePropSelector = propKey => createSelector(
  profileSelector,
  R.compose(
    R.prop(propKey),
    R.defaultTo({}),
  ),
);

// profileImageSelector :: State -> String | Nil
export const profileImageSelector = profilePropSelector('avatarUrl');

// profileEmailSelector :: State -> String | Nil
export const profileEmailSelector = profilePropSelector('email');
