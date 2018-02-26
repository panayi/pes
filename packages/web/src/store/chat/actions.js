import * as R from 'ramda';
import { createAction } from 'redux-actions';
import firebaseApi from 'services/firebase';
import { selectors as authSelectors } from 'store/firebase/auth';
import * as types from './types';

export const setActiveConversation = createAction(
  types.SET_ACTIVE_CONVERSATION,
);

export const resetActiveConversation = createAction(
  types.RESET_ACTIVE_CONVERSATION,
);

export const createMessage = (body, adId, buyerId) => (dispatch, getState) => {
  const uid = authSelectors.uidSelector(getState());
  const fromBuyer = R.equals(uid, buyerId);
  const data = {
    body,
    fromBuyer,
  };

  return dispatch(firebaseApi.messages.create(data, adId, buyerId));
};

export const markAsRead = conversationId => (dispatch, getState) => {
  const uid = authSelectors.uidSelector(getState());
  return dispatch(
    firebaseApi.conversations.updateRead(uid, conversationId, true),
  );
};
