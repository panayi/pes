import * as functions from 'firebase-functions';
import * as profileImageModel from 'functions/models/profileImage';

const handleCreatedOrUpdated = async event => {
  const snapshot = event.data;
  const { userId } = event.params;

  return profileImageModel.downloadImage(snapshot, userId);
};

export const profileImageCreated = functions.database
  .ref('/users/{userId}/profile/image')
  .onCreate(handleCreatedOrUpdated);
export const profileImageUpdated = functions.database
  .ref('/users/{userId}/profile/image')
  .onCreate(handleCreatedOrUpdated);
