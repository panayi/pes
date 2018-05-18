import * as R from 'ramda';
import { isNilOrEmpty, isArray } from 'ramda-adjunct';
import log from '../utils/log';
import * as firebaseConfig from '../config/firebase';
import { database } from '../config/firebaseClient';
import * as algoliaService from '../services/algolia';
import * as adModel from './ad';
import * as adImageModel from './adImage';
import * as betaInviteModel from './betaInvite';
import * as userModel from './user';

export const getAll = async () => database.ref(`/ads/legacy`).once('value');

export const findByEmail = async email => {
  const snapshot = await database
    .ref('/ads/legacy')
    .orderByChild('email')
    .equalTo(email)
    .once('value');
  const result = snapshot.val() || {};
  return R.values(result);
};

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

  // Associate ad to user
  await userModel.associateAd(adId, userId);

  const images = (await adImageModel.getAll(adId)).val();
  const adWithImages = R.merge(adToPublish, { images });
  await algoliaService.update(adWithImages, adId);
};

export const associateUserToLegacyAds = async userId => {
  const userSnapshot = await userModel.get(userId);
  const user = userSnapshot.val();
  const email = user.email;
  const phoneNumber = R.compose(
    R.prop('phoneNumber'),
    R.defaultTo({}),
    R.find(R.propEq('providerId', firebaseConfig.PROVIDER_IDS.phone)),
    R.propOr([], 'providerData'),
  )(user);
  const betaInvite = await betaInviteModel.findByUser(userId);
  const betaInviteEmail = isArray(betaInvite) && R.prop('email', betaInvite[1]);

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
    const matchingBetaInviteModel =
      !isNilOrEmpty(ad.email) &&
      !isNilOrEmpty(betaInviteEmail) &&
      ad.email === betaInviteEmail;

    if (matchingEmail || matchingPhone || matchingBetaInviteModel) {
      promises.push(publish(userId, adId, ad));
    }
  });

  return Promise.all(promises);
};
