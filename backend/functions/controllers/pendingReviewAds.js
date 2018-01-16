import * as functions from 'firebase-functions';
import * as pendingReviewAdModel from '../models/pendingReviewAd';
import * as adModel from '../models/ad';
import * as draftAdModel from '../models/draftAd';
import * as userModel from '../models/user';

const handlePendingReviewAdCreated = async event => {
  const snapshot = event.data;
  const { pendingReviewAdId } = event.params;
  const pendingReviewAd = snapshot.val();
  const userId = pendingReviewAd.user;

  // Publish ad
  const adId = await adModel.push(pendingReviewAd);

  if (userId) {
    // Associate ad to user
    await userModel.pushAd(adId, userId);

    // Delete draft ad for user
    await draftAdModel.remove(userId);
  }

  // Delete draft ad for user.anonymousUserId
  const anonymousUserId = userModel.getAnonymousUserId(userId);
  if (anonymousUserId) {
    await draftAdModel.remove(anonymousUserId);
  }

  return pendingReviewAdModel.remove(pendingReviewAdId);
};

export const pendingReviewAdCreated = functions.database
  .ref('/ads/pendingReview/{pendingReviewAdId}')
  .onCreate(handlePendingReviewAdCreated);
