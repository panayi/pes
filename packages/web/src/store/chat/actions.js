import * as R from 'ramda';
import { createAction } from 'redux-actions';
import propSelector from '@pesposa/core/src/utils/propSelector';
import firebaseApi from 'services/firebase';
import { track } from 'services/mixpanel';
import { selectors as authSelectors } from 'store/firebase/auth';
import { models } from 'store/firebase/data';
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
  const state = getState();
  const uid = authSelectors.uidSelector(state);
  const finalBuyerId = buyerId || uid;
  const fromBuyer = R.equals(uid, finalBuyerId);
  const data = {
    body,
    fromBuyer,
  };

  await dispatch(firebaseApi.messages.create(data, adId, finalBuyerId));
  const ad =
    models
      .ads(R.F)
      .one(propSelector('adId'))
      .selector(state, { adId }) || {};

  track('sendMessage', {
    message: body,
    adCategory: ad.category,
  });

  return {
    body,
    adId,
    buyerId: finalBuyerId,
  };
};
