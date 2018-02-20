import * as functions from 'firebase-functions';
import * as legacyAdModel from 'functions/models/legacyAd';

const handleCreatedOrUpdated = async event => {
  const snapshot = event.data;
  const { userId } = event.params;
  return legacyAdModel.associateUserToLegacyAds(snapshot, userId);
};

export const userCreated = functions.database
  .ref('/users/{userId}')
  .onCreate(handleCreatedOrUpdated);
export const userUpdated = functions.database
  .ref('/users/{userId}')
  .onUpdate(handleCreatedOrUpdated);
