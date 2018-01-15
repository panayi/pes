import * as R from 'ramda';
import { createAction } from 'redux-actions';
import api from 'services/api';
import { selectors as userSelectors } from 'store/user';
import * as types from './types';

const receiveLinkedAccounts = createAction(types.RECEIVE_LINKED_ACCOUNTS);

export const fetchLinkedAccounts = () => (dispatch, getState) => {
  const email = userSelectors.profileEmailSelector(getState());

  if (R.isNil(email)) {
    return dispatch(receiveLinkedAccounts([]));
  }

  return dispatch(api.auth.getProviders(email)).then(linkedAccounts =>
    dispatch(receiveLinkedAccounts(linkedAccounts)),
  );
};

export const actions = {
  fetchLinkedAccounts,
};
