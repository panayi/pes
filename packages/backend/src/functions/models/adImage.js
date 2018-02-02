import * as R from 'ramda';
import { database } from 'lib/firebaseClient';
import getImageDimensions from 'utils/getImageDimensions';

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
  // Only set dimensions when downloadURL has changed
  if (!imageSnapshot.child('downloadURL').changed()) {
    return false;
  }

  const { downloadURL } = imageSnapshot.val();
  const dimensions = await getImageDimensions(downloadURL);
  await imageSnapshot.ref.child('dimensions').set(dimensions);

  return true;
};
