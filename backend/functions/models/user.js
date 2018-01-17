import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { database } from 'lib/firebaseClient';
import getGeopositionFromIp from 'utils/getGeopositionFromIp';
import * as draftAdModel from './draftAd';

export const get = async userId =>
  database.ref(`/users/${userId}`).once('value');

export const update = async (props, userId) =>
  database.ref(`/users/${userId}`).update(props);

export const remove = async userId => database.ref(`/users/${userId}`).remove();

export const getGeoposition = async userId => {
  const userSnapshot = await get(userId);
  const user = userSnapshot.val();
  return R.either(R.prop('geoposition'), R.prop('geopositionFromIp'))(user);
};

export const setIpAndGeopositionFromIp = async (ip, userId) => {
  const geopositionFromIp = getGeopositionFromIp(ip);
  return database.ref(`/users/${userId}`).update({ ip, geopositionFromIp });
};

export const migrateAnonymousUser = async (anonymousUserId, userId) => {
  const anonymousUserSnapshot = await get(anonymousUserId);
  const userSnapshot = await get(userId);

  if (isNilOrEmpty(anonymousUserSnapshot)) {
    throw new Error(`Anonymous user with id=${anonymousUserId} does not exist`);
  }

  if (isNilOrEmpty(userSnapshot)) {
    throw new Error(`User with id=${userId} does not exist`);
  }

  // Move {`ip`, `geoposition`, `geopositionFromIp`} from anonymousUser to user
  const migrateProps = R.pick(
    ['ip', 'geoposition', 'geopositionFromIp'],
    anonymousUserSnapshot.val(),
  );
  await update(migrateProps, userId);

  // Move draft ad from anonymousUser to user
  await draftAdModel.move(anonymousUserId, userId);

  // Delete anonymousUser
  return remove(anonymousUserId);
};

export const associateAd = async (adId, userId) =>
  database.ref(`ads/byUser/${userId}/${adId}`).set(true);
