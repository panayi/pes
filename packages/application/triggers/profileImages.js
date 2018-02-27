/* @flow */
import * as functions from 'firebase-functions';
import * as profileImageModel from '@pesposa/core/src/models/profileImage';

type Event = {
  params: {
    userId: ID,
  },
  // TODO: How to specify **what type of snapshot** should expect?
  // In other words, how to specify what val() returns?
  data: $npm$firebase$database$DataSnapshot,
};

const handleCreatedOrUpdated = async (event: Event) => {
  const snapshot = event.data;
  const { userId } = event.params;

  return profileImageModel.downloadImage(snapshot, userId);
};

export const profileImageCreated = functions.database
  .ref('/users/{userId}/profile/image')
  .onCreate(handleCreatedOrUpdated);
export const profileImageUpdated = functions.database
  .ref('/users/{userId}/profile/image')
  .onUpdate(handleCreatedOrUpdated);
