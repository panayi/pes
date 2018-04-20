import * as functions from 'firebase-functions';
import { database } from '@pesposa/core/src/config/firebaseClient';
import * as modelPaths from '@pesposa/core/src/config/modelPaths';

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

  await database
    .ref(modelPaths.CONVERSATION(userId, adId, buyerId).string)
    .update(conversation);
};

const updateUsersConversation = async (adId, buyerId, fromBuyer, createdAt) => {
  const adRef = database.ref(`/ads/published/${adId}`);
  const adSnapshot = await adRef.once('value');
  const sellerId = adSnapshot.val().user;

  await Promise.all([
    updateUserConversation(adId, buyerId, buyerId, fromBuyer, createdAt),
    updateUserConversation(adId, buyerId, sellerId, !fromBuyer, createdAt),
  ]);
};

const handleCreate = async (snap, context) => {
  const message = snap.val();
  const { fromBuyer, createdAt } = message;
  const { adId, buyerId } = context.params;

  await updateUsersConversation(adId, buyerId, fromBuyer, createdAt);
};

export const messageCreated = functions.database
  .ref('/messages/{adId}/{buyerId}/{messageId}')
  .onCreate(handleCreate);
