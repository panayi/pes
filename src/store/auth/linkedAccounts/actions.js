import * as R from 'ramda';
import { createAction } from 'redux-actions';
import { profileEmailSelector } from 'store/auth/selectors';
import * as types from './types';

const receiveLinkedAccounts = createAction(types.RECEIVE_LINKED_ACCOUNTS);

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
