import * as R from 'ramda';
import * as functions from 'firebase-functions';
import firebase from '@pesposa/server-core/src/config/firebaseClient';
import client from '@pesposa/core/src/client';

const updateUserConversation = async (
  adId,
  buyerId,
  userId,
  isSender,
  createdAt,
) => {
  const conversation = {
    ad: adId,
    buyer: buyerId,
  };

  if (!isSender) {
    conversation.lastMessageReceivedAt = createdAt;
    conversation.notified = false;
  }

  return client.conversations.update(
    firebase,
    userId,
    adId,
    buyerId,
    conversation,
  );
};

const updateUsersConversation = async (adId, buyerId, fromBuyer, createdAt) => {
  const adSnapshot = await client.ads.get(firebase, adId);
  const sellerId = adSnapshot.val().seller;

  await Promise.all([
    updateUserConversation(adId, buyerId, buyerId, fromBuyer, createdAt),
    updateUserConversation(adId, buyerId, sellerId, !fromBuyer, createdAt),
  ]);
};

const handleCreate = async (snap, context) => {
  const message = snap.val();
  const { fromBuyer, createdAt } = message;
  const adId = R.path(['params', 'adId'], context);
  const buyerId = R.path(['params', 'buyerId'], context);

  await updateUsersConversation(adId, buyerId, fromBuyer, createdAt);
};

const messageCreated = functions.database
  .ref('/messages/{adId}/{buyerId}/{messageId}')
  .onCreate(handleCreate);

export default messageCreated;
