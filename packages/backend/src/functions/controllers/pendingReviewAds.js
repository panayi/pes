import * as functions from 'firebase-functions';
import * as pendingReviewAdModel from 'functions/models/pendingReviewAd';
import * as adModel from 'functions/models/ad';
import * as draftAdModel from 'functions/models/draftAd';
import * as userModel from 'functions/models/user';

const handlePendingReviewAdCreated = async event => {
  const { pendingReviewAdId } = event.params;
  const pendingReviewSnapshot = event.data;
  const pendingReviewAd = pendingReviewSnapshot.val();

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
