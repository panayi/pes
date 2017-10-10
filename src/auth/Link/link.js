import * as R from 'ramda';
import { createAction, handleAction } from 'redux-actions';
import { profileEmailSelector } from '../auth.selectors';

// ------------------------------------
// Constants
// ------------------------------------
const RECEIVE_LINKED_ACCOUNTS = 'auth/link/RECEIVE_LINKED_ACCOUNTS';

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = null;

const linkedAccountsReducer = handleAction(
  [RECEIVE_LINKED_ACCOUNTS],
  (state, { payload }) => payload,
  initialState,
);

export default linkedAccountsReducer;

// ------------------------------------
// Selectors
// ------------------------------------

// linkedAccountsSelector :: State -> Array | Nil
export const linkedAccountsSelector = R.path(['auth', 'linkedAccounts']);

// ------------------------------------
// Actions
// ------------------------------------
const receiveLinkedAccounts = createAction(RECEIVE_LINKED_ACCOUNTS);

export const fetchLinkedAccounts = () => (dispatch, getState, getFirebase) => {
  const email = profileEmailSelector(getState());

  if (R.isNil(email)) {
    return dispatch(receiveLinkedAccounts([]));
  }

  return getFirebase().auth().fetchProvidersForEmail(email)
    .then(linkedAccounts => dispatch(receiveLinkedAccounts(linkedAccounts)));
};

export const actions = {
  fetchLinkedAccounts,
};
