import * as functions from 'firebase-functions';
import * as avatarModel from '@pesposa/core/src/models/avatar';
import * as legacyAdModel from '@pesposa/core/src/models/legacyAd';

const handleCreate = async (snap, context) => {
  const { userId } = context.params;
  await avatarModel.download(snap, userId);
  return legacyAdModel.associateUserToLegacyAds(snap, userId);
};

const handleUpdate = async (change, context) => {
  const { userId } = context.params;
  await avatarModel.download(change.after, userId);
  return legacyAdModel.associateUserToLegacyAds(change.after, userId);
};

export const userCreated = functions.database
  .ref('/users/{userId}')
  .onCreate(handleCreate);
export const userUpdated = functions.database
  .ref('/users/{userId}')
  .onUpdate(handleUpdate);
