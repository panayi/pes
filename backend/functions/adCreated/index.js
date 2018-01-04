import * as functions from 'firebase-functions';
import getCurrentEpoch from 'helpers/getCurrentEpoch';
import { database } from '../lib/firebaseClient';

const setTimestamp = async (event, snapshot, ad) => {
  // Skip legacy ads
  if (ad.isLegacy) {
    return null;
  }

  const now = getCurrentEpoch(event);

  return snapshot.ref.child('createdAt').set(now);
};

const pushAdIdToUserAds = async (adId, uid) => {
  await database.ref(`myAds/${uid}/${adId}`).set(true);
};

// Cleanup pending ad of the actual user
const removePendingAdOfUser = async uid => {
  const pendingAdRef = database.ref(`/pendingAds/${uid}`);
  await pendingAdRef.remove();
};

// Cleanup pending ad of anonymous user that belongs to this user
const removePendingAdOfAnonymousUser = async userRef => {
  const userSnapshot = await userRef.once('value');
  const { anonymousUserId } = userSnapshot.val();

  if (!anonymousUserId) {
    return;
  }

  const anonymousPendingAdRef = database.ref(`/pendingAds/${anonymousUserId}`);
  await anonymousPendingAdRef.remove();
};

const adCreated = async event => {
  const snapshot = event.data;
  const ad = snapshot.val();
  const adId = event.params.adId;
  const uid = ad.user;
  const userRef = database.ref(`/users/${uid}`);

  await setTimestamp(event, snapshot, ad);
  if (uid) {
    await pushAdIdToUserAds(adId, uid);
    await removePendingAdOfUser(uid);
  }
  await removePendingAdOfAnonymousUser(userRef);
};

export default functions.database.ref('/ads/{adId}').onCreate(adCreated);
