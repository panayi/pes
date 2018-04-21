import * as R from 'ramda';
import { database } from '../config/firebaseClient';
import getImageDimensions from '../utils/getImageDimensions';
import * as storageService from '../services/storage';

export const getAll = async adId =>
  database.ref(`/ads/images/${adId}`).once('value');

export const setAdImages = async (images, adId) => {
  const dimensions = await Promise.all(
    R.map(
      async image => getImageDimensions(image.downloadURL),
      R.values(images),
    ),
  );
  const imagesWithDimensions = R.addIndex(R.map)(
    (image, index) => R.merge(image, { dimensions: dimensions[index] }),
    images,
  );
  await database.ref(`/ads/images/${adId}`).set(imagesWithDimensions);

  return imagesWithDimensions;
};

export const setDimensions = async imageSnapshot => {
  const image = imageSnapshot.val();
  const dimensions = await getImageDimensions(image.downloadURL);
  return imageSnapshot.ref.set(R.merge(image, { dimensions }));
};

export const removeFile = async adImage => {
  const { fullPath } = adImage;
  return storageService.removeFile(fullPath);
};

export const removeAll = async adId => {
  const adImagesSnapshot = await getAll(adId);

  if (adImagesSnapshot.exists()) {
    const adImages = R.values(adImagesSnapshot.val());
    await Promise.all(R.map(removeFile, adImages));
    await database.ref(`/ads/images/${adId}`).remove();
  }
};
