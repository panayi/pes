import * as functions from 'firebase-functions';
import log from '@pesposa/core/src/utils/log';
import * as pendingReviewAdModel from '@pesposa/core/src/models/pendingReviewAd';
import * as adModel from '@pesposa/core/src/models/ad';
import * as adImageModel from '@pesposa/core/src/models/adImage';
import * as draftAdModel from '@pesposa/core/src/models/draftAd';
import * as userModel from '@pesposa/core/src/models/user';

const handlePendingReviewAdCreated = async (snap, context) => {
  const { pendingReviewAdId } = context.params;
  const pendingReviewAd = snap.val();
  const userId = pendingReviewAd.user;

  const isValid = await pendingReviewAdModel.validate(pendingReviewAd);

  if (!isValid) {
    log.error('Ad validation failed');

    await pendingReviewAdModel.remove(pendingReviewAdId);
    await adImageModel.removeAll(pendingReviewAdId);
    await draftAdModel.remove(userId);

    return null;
  }

  // Publish ad
  const adId = await adModel.create(pendingReviewAd);

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
