/* @flow */
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { database } from '../config/firebaseClient';
import * as draftAdModel from './draftAd';

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

export const migrateAnonymousUser = async (anonymousUserId: ID, userId: ID) => {
  const anonymousUserSnapshot = await get(anonymousUserId);
  const userSnapshot = await get(userId);

  if (
    isNilOrEmpty(anonymousUserSnapshot) ||
    isNilOrEmpty(anonymousUserSnapshot.val())
  ) {
    throw new Error(`Anonymous user with id=${anonymousUserId} does not exist`);
  }

  if (isNilOrEmpty(userSnapshot) || isNilOrEmpty(userSnapshot.val())) {
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
