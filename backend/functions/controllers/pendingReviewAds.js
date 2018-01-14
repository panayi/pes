import * as functions from 'firebase-functions';
import { database } from 'lib/firebaseClient';
import * as pendingReviewAdModel from '../models/pendingReviewAd';
import * as adModel from '../models/ad';
import * as draftAdModel from '../models/draftAd';
import * as userModel from '../models/user';

const handlePendingReviewAdCreated = async event => {
  const snapshot = event.data;
  const { pendingReviewAdId } = event.params;
  const pendingReviewAd = snapshot.val();
  const userId = pendingReviewAd.user;
  const userRef = database.ref(`/users/${userId}`);

  const adId = await adModel.push(pendingReviewAd);

  if (userId) {
    await userModel.pushAd(adId, userId);
    await draftAdModel.remove(userId);
  }

  await draftAdModel.removeFromAnonymousUser(userRef);

  return pendingReviewAdModel.remove(pendingReviewAdId);
};

export const pendingReviewAdCreated = functions.database
  .ref('/ads/pendingReview/{pendingReviewAdId}')
  .onCreate(handlePendingReviewAdCreated);
