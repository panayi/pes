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

export const createMessage = (body, adId, buyerId) => async (
  dispatch,
  getState,
) => {
  const uid = authSelectors.uidSelector(getState());
  const finalBuyerId = buyerId || uid;
  const fromBuyer = R.equals(uid, finalBuyerId);
  const data = {
    body,
    fromBuyer,
  };

  await dispatch(firebaseApi.messages.create(data, adId, finalBuyerId));
  return {
    body,
    adId,
    buyerId: finalBuyerId,
  };
};

export const markAsRead = conversationId => (dispatch, getState) => {
  const uid = authSelectors.uidSelector(getState());
  return dispatch(
    firebaseApi.conversations.updateRead(uid, conversationId, true),
  );
};
