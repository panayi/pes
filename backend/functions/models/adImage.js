import { database } from 'lib/firebaseClient';
import getImageDimensions from 'utils/getImageDimensions';

export const getAll = async adId =>
  database.ref(`/ads/images/${adId}`).once('value');

export const setDimensions = async imageSnapshot => {
  // Only set dimensions when downloadURL has changed
  if (!imageSnapshot.child('downloadURL').changed()) {
    return null;
  }

  const { downloadURL } = imageSnapshot.val();

  const dimensions = await getImageDimensions(downloadURL);

  return imageSnapshot.ref.child('dimensions').set(dimensions);
};
