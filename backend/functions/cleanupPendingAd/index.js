import * as functions from 'firebase-functions';
import { database } from '../lib/firebaseClient';

const cleanupPendingAd = async event => {
  const snapshot = event.data;
  const ad = snapshot.val();

  // Cleanup pending ad of the actual user
  const uid = ad.user;
  const pendingAdRef = database.ref(`/pendingAds/${uid}`);
  await pendingAdRef.remove();

  // Also cleanup pending ad of anonymous user that belongs to this user
  const userRef = database.ref(`/users/${uid}`);
  const userSnapshot = await userRef.once('value');
  const { anonymousUserId } = userSnapshot.val();

  if (!anonymousUserId) {
    return;
  }

  const anonymousPendingAdRef = database.ref(`/pendingAds/${anonymousUserId}`);
  await anonymousPendingAdRef.remove();
};

export default functions.database.ref('/ads/{adId}').onCreate(cleanupPendingAd);
