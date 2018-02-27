/* @flow */
import * as functions from 'firebase-functions';
import * as pendingReviewAdModel from '@pesposa/core/src/models/pendingReviewAd';
import * as adModel from '@pesposa/core/src/models/ad';
import * as draftAdModel from '@pesposa/core/src/models/draftAd';
import * as userModel from '@pesposa/core/src/models/user';

type Event = {
  params: {
    pendingReviewAdId: ID,
  },
  // TODO: How to specify **what type of snapshot** should expect?
  // In other words, how to specify what val() returns?
  data: $npm$firebase$database$DataSnapshot,
};

const handlePendingReviewAdCreated = async (event: Event) => {
  const { pendingReviewAdId } = event.params;
  const pendingReviewSnapshot = event.data;
  const pendingReviewAd = pendingReviewSnapshot.val();

  // Publish ad
  const adId = await adModel.create(pendingReviewAd);

  const userId: ID = pendingReviewAd.user;
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
