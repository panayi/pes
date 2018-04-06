import * as R from 'ramda';
import { createAction } from 'redux-actions';
import * as auth from '@pesposa/core/src/client/auth';
import { selectors as profileSelectors } from '@pesposa/client-core/src/store/firebase/profile';
import * as constants from './constants';

const receiveLinkedProviders = createAction(constants.RECEIVE_LINKED_PROVIDERS);

export const fetchLinkedProviders = () => async (
  dispatch,
  getState,
  getFirebase,
) => {
  const email = profileSelectors.profileEmailSelector(getState());

  if (R.isNil(email)) {
    dispatch(receiveLinkedProviders([]));
    return;
  }

  const linkedProviders = await auth.getProviders(getFirebase(), email);
  dispatch(receiveLinkedProviders(linkedProviders));
};

export const actions = {
  fetchLinkedProviders,
};
