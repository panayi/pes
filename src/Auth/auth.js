import R from 'ramda';
import { createSelector } from 'reselect';
// ------------------------------------
// Constants
// ------------------------------------
const FIREBASE_PATH = ['firebase'];
const FIREBASE_AUTH_PATH = [...FIREBASE_PATH, 'auth'];

// ------------------------------------
// Selectors
// ------------------------------------

// firebaseSelector :: State -> Object
const firebaseAuthSelector = R.pathOr({}, FIREBASE_AUTH_PATH);

// isLoadedSelector :: State -> Maybe(Boolean)
const isLoadedSelector = createSelector(
  firebaseAuthSelector,
  R.compose(
    R.prop('isLoaded'),
    R.defaultTo({}),
  ),
);

// isInitializingSelector :: State -> Maybe(Boolean)
const isInitializingSelector = R.path([...FIREBASE_PATH, 'isInitializing']);

// hasUidSelector :: State -> Maybe(String)
const hasUidSelector = createSelector(
  firebaseAuthSelector,
  R.compose(
    R.not,
    R.isNil,
    R.prop('uid'),
  ),
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
  R.useWith(R.and, [
    R.not,
    R.identity,
  ]),
);

// isNotAuthenticatedSelector :: State -> Boolean
// Equals to: !isAuthenticatingSelector && !hasUidSelector
export const isNotAuthenticatedSelector = createSelector(
  isAuthenticatingSelector,
  hasUidSelector,
  R.useWith(R.and, [
    R.not,
    R.not,
  ]),
);
