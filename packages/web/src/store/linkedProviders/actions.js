import * as R from 'ramda';
import { createAction } from 'redux-actions';
import firebaseApi from 'services/firebase';
import { selectors as profileSelectors } from 'store/firebase/profile';
import * as constants from './constants';

const receiveLinkedProviders = createAction(constants.RECEIVE_LINKED_PROVIDERS);

export const fetchLinkedProviders = () => async (dispatch, getState) => {
  const email = profileSelectors.profileEmailSelector(getState());

  if (R.isNil(email)) {
    dispatch(receiveLinkedProviders([]));
    return;
  }

  const linkedProviders = await dispatch(firebaseApi.auth.getProviders(email));
  dispatch(receiveLinkedProviders(linkedProviders));
};

export const actions = {
  fetchLinkedProviders,
};
