/* @flow */
import { isNilOrEmpty } from 'ramda-adjunct';
import * as fetchService from '../services/fetch';
import * as storageService from '../services/storage';
import * as userModel from './user';

const getFacebookImageUrl = uid =>
  `https://graph.facebook.com/${uid}/picture?height=1000`;

export const downloadImage = async (
  profileImageSnapshot: $npm$firebase$database$DataSnapshot,
  userId: ID,
) => {
  const { downloadURL, providerId } = profileImageSnapshot.val();

  if (
    isNilOrEmpty(downloadURL) ||
    !profileImageSnapshot.child('downloadURL').changed()
  ) {
    return null;
  }

  const provider = await userModel.getProviderById(providerId, userId);

  if (isNilOrEmpty(provider)) {
    return null;
  }

  let url;
  let filename;
  if (providerId === 'facebook.com') {
    url = getFacebookImageUrl(provider.uid);
    filename = 'facebook';
  }

  if (isNilOrEmpty(url)) {
    return null;
  }

  const path = `profileImages/${userId}`;
  const { buffer, contentType } = await fetchService.getImage(url);

  const fullPath = await storageService.uploadImage(
    buffer,
    contentType,
    path,
    filename,
  );
  return profileImageSnapshot.ref.child('fullPath').set(fullPath);
};
