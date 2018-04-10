import * as functions from 'firebase-functions';
import * as pendingReviewAdModel from '@pesposa/core/src/models/pendingReviewAd';
import * as adModel from '@pesposa/core/src/models/ad';
import * as draftAdModel from '@pesposa/core/src/models/draftAd';
import * as userModel from '@pesposa/core/src/models/user';

const handlePendingReviewAdCreated = async (snap, context) => {
  const { pendingReviewAdId } = context.params;
  const pendingReviewAd = snap.val();

  // Publish ad
  const adId = await adModel.create(pendingReviewAd);

  const userId = pendingReviewAd.user;
  if (userId) {
    // Associate ad to user
    await userModel.associateAd(adId, userId);

    // Delete draft ad for user
    await draftAdModel.remove(userId);
  }

  return pendingReviewAdModel.remove(pendingReviewAdId);
};

export const pendingReviewAdCreated = functions.database
  .ref('/ads/pendingReview/{pendingReviewAdId}')
  .onCreate(handlePendingReviewAdCreated);
