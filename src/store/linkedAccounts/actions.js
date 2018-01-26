import * as R from 'ramda';
import { createAction } from 'redux-actions';
import api from 'services/api';
import { selectors as profileSelectors } from 'store/firebase/profile';
import * as types from './types';

const receiveLinkedAccounts = createAction(types.RECEIVE_LINKED_ACCOUNTS);

export const fetchLinkedAccounts = () => (dispatch, getState) => {
  const email = profileSelectors.profileEmailSelector(getState());

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
