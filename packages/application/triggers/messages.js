/* @flow */
import * as functions from 'firebase-functions';
import firebase, { database } from '@pesposa/core/src/config/firebaseClient';
import * as modelPaths from '@pesposa/core/src/config/modelPaths';
import getTimestamp from '@pesposa/core/src/utils/getTimestamp';

type Event = {
  params: {
    adId: ID,
    buyerId: ID,
  },
  // TODO: How to specify **what type of snapshot** should expect?
  // In other words, how to specify what val() returns?
  data: $npm$firebase$database$DataSnapshot,
};

const updateUserConversation = async (adId, buyerId, userId, isSender) => {
  const conversation: Conversation = {
    ad: adId,
    buyer: buyerId,
    lastMessageCreatedAt: getTimestamp(firebase),
  };

  if (!isSender) {
    conversation.read = false;
  }

  await database
    .ref(modelPaths.CONVERSATION(userId, adId, buyerId).string)
    .update(conversation);
};

const updateUsersConversation = async (adId, buyerId, fromBuyer) => {
  const adRef = database.ref(`/ads/published/${adId}`);
  const adSnapshot = await adRef.once('value');
  const sellerId = adSnapshot.val().user;

  await Promise.all([
    updateUserConversation(adId, buyerId, buyerId, fromBuyer),
    updateUserConversation(adId, buyerId, sellerId, !fromBuyer),
  ]);
};

const handleCreate = async (event: Event) => {
  const snapshot = event.data;
  const message: Message = snapshot.val();
  const { fromBuyer }: { fromBuyer: boolean } = message;
  const { adId, buyerId } = event.params;

  await updateUsersConversation(adId, buyerId, fromBuyer);
};

export const messageCreated = functions.database
  .ref('/messages/{adId}/{buyerId}/{messageId}')
  .onCreate(handleCreate);
