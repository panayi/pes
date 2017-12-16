import * as functions from 'firebase-functions';
import * as R from 'ramda';
import { database } from '../lib/firebaseClient';

const migratePendingAd = async event => {
  const { uid } = event.params;
  const userSnapshot = event.data;
  const user = userSnapshot.val();
  const anonymousUserId = R.prop('anonymousUserId', user);

  if (R.isNil(anonymousUserId)) {
    return;
  }

  const sourceRef = database.ref(`/pendingAds/${anonymousUserId}`);
  const targetRef = database.ref(`/pendingAds/${uid}`);
  const snapshot = await sourceRef.once('value');

  await userSnapshot.update({ anonymousUserId: null });
  await targetRef.set(snapshot.val());
  await sourceRef.remove();
};

export default functions.database.ref('/users/{uid}').onWrite(migratePendingAd);
