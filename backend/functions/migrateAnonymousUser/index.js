import * as functions from 'firebase-functions';
import * as R from 'ramda';
import { database } from '../lib/firebaseClient';

const migrateAnonymousUser = async event => {
  const { uid } = event.params;
  const user = event.data.val();
  const anonymousUserId = R.prop('anonymousUserId', user);

  if (R.isNil(anonymousUserId)) {
    return;
  }

  const oldRef = database.ref(`/pendingAds/${anonymousUserId}`);
  const newRef = database.ref(`/pendingAds/${uid}`);

  const snapshot = await database
    .ref(`/pendingAds/${anonymousUserId}`)
    .once('value');
  await newRef.set(snapshot.val());
  await oldRef.remove();
};

export default functions.database
  .ref('/users/{uid}')
  .onWrite(migrateAnonymousUser);
