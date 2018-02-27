import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import log from '../utils/log';
import * as firebaseConfig from '../config/firebase';
import { database } from '../config/firebaseClient';
import * as algoliaService from '../services/algolia';
import * as adModel from './ad';
import * as adImageModel from './adImage';

const publish = async (userId, adId, ad) => {
  const adToPublish = R.compose(
    R.assoc('user', userId),
    R.omit(['email', 'phone', 'id']),
  )(ad);

  const existingAd = (await adModel.get(adId)).val();
  if (!isNilOrEmpty(existingAd)) {
    log.error(
      `LegacyAd published failed because an ad is already published at ${adId}`,
    );
    return;
  }

  await database.ref(`/ads/published/${adId}`).set(adToPublish);
  await database.ref(`/ads/legacy/${adId}`).remove();

  const images = (await adImageModel.getAll(adId)).val();
  const adWithImages = R.merge(adToPublish, { images });
  await algoliaService.update(adWithImages, adId);
};

export const associateUserToLegacyAds = async (userSnapshot, userId) => {
  const user = userSnapshot.val();
  const email = user.email;
  const phoneNumber = R.compose(
    R.prop('phoneNumber'),
    R.defaultTo({}),
    R.find(R.propEq('providerId', firebaseConfig.PROVIDER_IDS.phone)),
    R.propOr([], 'providerData'),
  )(user);

  const snapshot = await database.ref('/ads/legacy').once('value');
  const promises = [];

  snapshot.forEach(child => {
    const ad = child.val();
    const adId = child.key;
    const matchingEmail =
      !isNilOrEmpty(ad.email) && !isNilOrEmpty(email) && ad.email === email;
    const matchingPhone =
      !isNilOrEmpty(ad.phone) &&
      !isNilOrEmpty(phoneNumber) &&
      ad.phone === phoneNumber;
    if (matchingEmail || matchingPhone) {
      promises.push(publish(userId, adId, ad));
    }
  });

  return promises;
};
