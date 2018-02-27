/* @flow */
import * as R from 'ramda';
import { database } from '../config/firebaseClient';
import getImageDimensions from '../utils/getImageDimensions';

export const getAll = async (adId: ID) =>
  database.ref(`/ads/images/${adId}`).once('value');

export const setAdImages = async (images: { [id: ID]: Image }, adId: ID) => {
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

export const setDimensions = async (imageSnapshot): Promise<boolean> => {
  // Only set dimensions when downloadURL has changed
  if (!imageSnapshot.child('downloadURL').changed()) {
    return false;
  }

  const image = imageSnapshot.val();
  const dimensions = await getImageDimensions(image.downloadURL);
  await imageSnapshot.ref.set(R.merge(image, { dimensions }));

  return true;
};
