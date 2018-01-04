import * as functions from 'firebase-functions';
import getCurrentEpoch from 'helpers/getCurrentEpoch';
import { database } from '../lib/firebaseClient';

const setMessageTimestamp = async (now, snapshot) => {
  await snapshot.ref.child('createdAt').set(now);
};

const updateUserConversation = async (adId, buyerId, userId, isSender, now) => {
  const conversation = {
    ad: adId,
    buyer: buyerId,
    lastMessageCreatedAt: now,
  };

  if (!isSender) {
    conversation.read = false;
  }

  await database
    .ref(`myConversations/${userId}/${adId}_${buyerId}`)
    .update(conversation);
};

const updateUsersConversation = async (adId, buyerId, fromBuyer, now) => {
  const adRef = database.ref(`/ads/${adId}`);
  const adSnapshot = await adRef.once('value');
  const sellerId = adSnapshot.val().user;

  await Promise.all([
    updateUserConversation(adId, buyerId, buyerId, fromBuyer, now),
    updateUserConversation(adId, buyerId, sellerId, !fromBuyer, now),
  ]);
};

const messageCreated = async event => {
  const snapshot = event.data;
  const message = snapshot.val();
  const { fromBuyer } = message;
  const { adId, buyerId } = event.params;
  const now = getCurrentEpoch(event);

  await setMessageTimestamp(now, snapshot);
  await updateUsersConversation(adId, buyerId, fromBuyer, now);
};

export default functions.database
  .ref('/messages/{adId}/{buyerId}/{messageId}')
  .onCreate(messageCreated);
