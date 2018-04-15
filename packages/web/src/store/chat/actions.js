import * as R from 'ramda';
import { createAction } from 'redux-actions';
import firebaseApi from 'services/firebase';
import { selectors as authSelectors } from 'store/firebase/auth';
import * as types from './types';
import * as selectors from './selectors';

const setActiveConversation = createAction(types.SET_ACTIVE_CONVERSATION);

const resetActiveConversation = createAction(types.RESET_ACTIVE_CONVERSATION);

export const setLastActiveAt = conversationId => (dispatch, getState) => {
  const uid = authSelectors.uidSelector(getState());
  return dispatch(
    firebaseApi.conversations.setLastActiveAt(uid, conversationId),
  );
};

export const setLastActiveAtOnDisconnect = conversationId => (
  dispatch,
  getState,
) => {
  const uid = authSelectors.uidSelector(getState());
  return dispatch(
    firebaseApi.conversations.setLastActiveAtOnDisconnect(uid, conversationId),
  );
};

export const cancelSetLastActiveAtOnDisconnect = conversationId => (
  dispatch,
  getState,
) => {
  const uid = authSelectors.uidSelector(getState());
  return dispatch(
    firebaseApi.conversations.cancelSetLastActiveAtOnDisconnect(
      uid,
      conversationId,
    ),
  );
};

export const deactivateConversation = conversationId => async (
  dispatch,
  getState,
) => {
  const finalConversationId =
    conversationId || selectors.activeConversationSelector(getState());

  if (R.isNil(finalConversationId)) {
    return null;
  }

  dispatch(resetActiveConversation(finalConversationId));
  await dispatch(setLastActiveAt(finalConversationId));
  return dispatch(cancelSetLastActiveAtOnDisconnect(finalConversationId));
};

export const activateConversation = conversationId => async (
  dispatch,
  getState,
) => {
  if (R.isNil(conversationId)) {
    return dispatch(deactivateConversation());
  }

  const currentConversationId = selectors.activeConversationSelector(
    getState(),
  );

  if (currentConversationId === conversationId) {
    return null;
  }

  dispatch(deactivateConversation(currentConversationId));

  // Begin activation
  dispatch(setActiveConversation(conversationId));
  await dispatch(setLastActiveAt(conversationId));
  return dispatch(setLastActiveAtOnDisconnect(conversationId));
};

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
