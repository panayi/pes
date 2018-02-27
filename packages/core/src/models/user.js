/* @flow */
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { database } from '../config/firebaseClient';
import * as draftAdModel from './draftAd';
import * as locationModel from './location';
import * as localeModel from './locale';

export const get = async (userId: ID) =>
  database.ref(`/users/${userId}`).once('value');

export const update = async (props: Object, userId: ID) =>
  database.ref(`/users/${userId}`).update(props);

export const remove = async (userId: ID) =>
  database.ref(`/users/${userId}`).remove();

export const getProviderById = async (providerId: string, userId: ID) => {
  const user = (await get(userId)).val();
  const providerData = R.propOr([], 'providerData', user);
  return R.find(R.propEq('providerId', providerId), providerData);
};

export const setInfo = async (
  {
    geoposition,
    ip,
    locales,
  }: { geoposition: Geoposition, ip: IP, locales: Array<string> },
  userId: ID,
) => {
  const location = await locationModel.get(geoposition, ip);

  // TODO: In the future we should not need
  // to store the detected locale on the database
  // Once we add SSR, the locale will be calculated on the server
  // and be used to generate content, as well as include it in the HTML response.
  const locale = await localeModel.find(locales);
  const data = { location, ip, locale };

  await update(data, userId);
};

export const migrateAnonymousUser = async (anonymousUserId: ID, userId: ID) => {
  const anonymousUserSnapshot = await get(anonymousUserId);
  const userSnapshot = await get(userId);

  if (isNilOrEmpty(anonymousUserSnapshot)) {
    throw new Error(`Anonymous user with id=${anonymousUserId} does not exist`);
  }

  if (isNilOrEmpty(userSnapshot)) {
    throw new Error(`User with id=${userId} does not exist`);
  }

  // Move {`ip`, `location`, `locationFromIp`} from anonymousUser to user
  const migrateProps = R.pick(
    ['ip', 'location', 'locationFromIp'],
    anonymousUserSnapshot.val(),
  );
  await update(migrateProps, userId);

  // Move draft ad from anonymousUser to user
  await draftAdModel.move(anonymousUserId, userId);

  // Delete anonymousUser
  return remove(anonymousUserId);
};

export const associateAd = async (adId: ID, userId: ID) =>
  database.ref(`ads/byUser/${userId}/${adId}`).set(true);
