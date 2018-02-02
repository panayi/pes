import * as functions from 'firebase-functions';
import { database } from 'lib/firebaseClient';
import * as timestamp from 'utils/timestamp';

const updateUserConversation = async (adId, buyerId, userId, isSender) => {
  const conversation = {
    ad: adId,
    buyer: buyerId,
    lastMessageCreatedAt: timestamp.get(),
  };

  if (!isSender) {
    conversation.read = false;
  }

  await database
    .ref(`myConversations/${userId}/${adId}_${buyerId}`)
    .update(conversation);
};

const updateUsersConversation = async (adId, buyerId, fromBuyer, now) => {
  const adRef = database.ref(`/ads/published/${adId}`);
  const adSnapshot = await adRef.once('value');
  const sellerId = adSnapshot.val().user;

  await Promise.all([
    updateUserConversation(adId, buyerId, buyerId, fromBuyer, now),
    updateUserConversation(adId, buyerId, sellerId, !fromBuyer, now),
  ]);
};

const handleCreate = async event => {
  const snapshot = event.data;
  const message = snapshot.val();
  const { fromBuyer } = message;
  const { adId, buyerId } = event.params;

  await timestamp.set('createdAt', snapshot.ref);
  await updateUsersConversation(adId, buyerId, fromBuyer);
};

export const messageCreated = functions.database
  .ref('/messages/{adId}/{buyerId}/{messageId}')
  .onCreate(handleCreate);
