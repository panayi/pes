import { isNilOrEmpty } from 'ramda-adjunct';
import * as functions from 'firebase-functions';
import client from '@pesposa/core/src/client';
import server from '@pesposa/server-core/src/server';
import firebase from '@pesposa/server-core/src/config/firebaseClient';

const handleRemoveExternaUserAd = async data => {
  const { adId, code } = data;
  const externalUserCodeSnap = await server.externalUserCodes.get(
    firebase,
    code,
  );

  if (!externalUserCodeSnap.exists()) {
    throw new functions.https.HttpsError(
      'not-found',
      '/externalUserCodes[code] does not exist',
    );
  }

  const adSnap = await client.ads.get(firebase, adId);

  if (!adSnap.exists()) {
    throw new functions.https.HttpsError(
      'not-found',
      '/ads[adId] does not exist',
    );
  }

  const ad = adSnap.val();
  const externalUserId = externalUserCodeSnap.val();

  if (ad.seller !== externalUserId) {
    throw new functions.https.HttpsError('permission-denied');
  }

  // All good, remove the ad
  await client.ads.remove(firebase, adId, ad);

  // Also complete the associated convertExternalUserTask,
  // if no ads left for this externalUser
  const sellerAdsSnap = await client.sellerAds.getAllPublished(
    firebase,
    externalUserId,
  );
  const sellerAds = sellerAdsSnap.val();
  if (isNilOrEmpty(sellerAds)) {
    await server.convertExternalUserTasks.userDeletedAds(
      firebase,
      externalUserId,
    );
  }

  return null;
};

const removeExternaUserAd = functions.https.onCall(handleRemoveExternaUserAd);

export default removeExternaUserAd;
