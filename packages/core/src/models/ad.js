/* @flow */
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { database } from '../config/firebaseClient';
import * as algoliaService from '../services/algolia';
import * as timestamp from '../utils/timestamp';
import * as userModel from './user';
import * as adImageModel from './adImage';

export const get = async (adId: ID) =>
  database.ref(`/ads/published/${adId}`).once('value');

export const getWithImages = async (adId: ID) => {
  const ad: Ad = (await get(adId)).val();
  const images = (await adImageModel.getAll(adId)).val();

  return R.merge(ad, { images });
};

export const create = async (ad: PendingReviewAd) => {
  const { images, user } = ad;
  const userSnapshot = await userModel.get(user);
  const { location } = userSnapshot.val();

  const finalAd = R.compose(
    R.omit(['images']),
    R.assoc('location', location),
    R.assoc('createdAt', timestamp.get()),
  )(ad);

  // Publish ad
  const { key: adId }: { key: ID } = await database
    .ref(`ads/published`)
    .push(finalAd);

  // Save images
  const hasImages = !isNilOrEmpty(images);
  if (hasImages) {
    await adImageModel.setAdImages(images, adId);
  }

  // Finally, index ad on algolia
  const adToIndex: Ad = await getWithImages(adId);
  await algoliaService.add(adToIndex, adId);

  return adId;
};
