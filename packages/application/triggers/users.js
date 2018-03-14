import * as functions from 'firebase-functions';
import * as avatarModel from '@pesposa/core/src/models/avatar';
import * as legacyAdModel from '@pesposa/core/src/models/legacyAd';

const handleCreatedOrUpdated = async event => {
  const snapshot = event.data;
  const { userId } = event.params;
  await avatarModel.download(snapshot, userId);
  return legacyAdModel.associateUserToLegacyAds(snapshot, userId);
};

export const userCreated = functions.database
  .ref('/users/{userId}')
  .onCreate(handleCreatedOrUpdated);
export const userUpdated = functions.database
  .ref('/users/{userId}')
  .onUpdate(handleCreatedOrUpdated);
