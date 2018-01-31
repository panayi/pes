import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { database } from 'lib/firebaseClient';
import * as algoliaService from 'services/algolia';
import * as timestamp from 'utils/timestamp';
import * as userModel from './user';
import * as adImageModel from './adImage';

export const get = async adId =>
  database.ref(`/ads/published/${adId}`).once('value');

export const create = async ad => {
  const { images, user } = ad;
  const userSnapshot = await userModel.get(user);
  const { location } = userSnapshot.val();

  const finalAd = R.compose(
    R.omit(['images']),
    R.assoc('location', location),
    R.assoc('createdAt', timestamp.get()),
  )(ad);

  // Publish ad
  const { key: adId } = await database.ref(`ads/published`).push(finalAd);

  // Save images
  const hasImages = !isNilOrEmpty(images);
  const savedImages = hasImages
    ? await adImageModel.setAdImages(images, adId)
    : null;

  // Finally, index ad on algolia
  const savedAd = (await get(adId)).val();
  const algoliaAd = R.merge(savedAd, { images: savedImages });
  await algoliaService.add(algoliaAd, adId);

  return adId;
};
