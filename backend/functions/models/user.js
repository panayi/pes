import * as R from 'ramda';
import { database } from 'lib/firebaseClient';
import getGeopositionFromIp from 'utils/getGeopositionFromIp';
import * as draftAdModel from './draftAd';

const basepathForUser = anonymous => (anonymous ? '/anonymousUsers' : '/users');

export const get = async (userId, { anonymous } = {}) =>
  database.ref(`${basepathForUser(anonymous)}/${userId}`).once('value');

export const update = async (user, userId, { anonymous } = {}) =>
  database.ref(`${basepathForUser(anonymous)}/${userId}`).update(user);

export const remove = async (userId, { anonymous } = {}) =>
  database.ref(`${basepathForUser(anonymous)}/${userId}`).remove();

export const getGeoposition = async (userId, { anonymous } = {}) => {
  const userSnapshot = await get(userId, { anonymous });
  const user = userSnapshot.val();
  return R.either(R.prop('geoposition'), R.prop('geopositionFromIp'))(user);
};

export const setIpAndGeopositionFromIp = async (
  ip,
  userId,
  { anonymous } = {},
) => {
  const geopositionFromIp = getGeopositionFromIp(ip);
  return database
    .ref(`/${basepathForUser(anonymous)}/${userId}`)
    .update({ ip, geopositionFromIp });
};

export const getAnonymousUserId = async userId => {
  const userSnapshot = await get(userId);
  const user = userSnapshot.val();
  return R.prop('anonymousUserId', user);
};

export const unsetAnonymousUserId = async userRef =>
  userRef.child('anonymousUserId').remove();

export const migrateAnonymousUser = async userSnapshot => {
  const { key: userId, ref: userRef } = userSnapshot;
  const anonymousUserId = await getAnonymousUserId(userId);

  if (R.isNil(anonymousUserId)) {
    return null;
  }

  console.log(
    `Logged in user is referenced with anonymous user with id=${anonymousUserId}`,
  );

  // Move {`ip`, `geoposition`, `geopositionFromIp`} from anonymousUser to user
  const anonymousUserSnapshot = await get(anonymousUserId, { anonymous: true });
  if (R.isNil(anonymousUserSnapshot)) {
    return null;
  }
  const migrateProps = R.pick(
    ['ip', 'geoposition', 'geopositionFromIp'],
    anonymousUserSnapshot.val(),
  );
  await update(migrateProps, userId);

  // Move draft ad from anonymousUser to user
  await draftAdModel.move(anonymousUserId, userId);

  // Dereference anonymousUser from user
  await unsetAnonymousUserId(userRef);

  // Delete anonymousUser
  return remove(anonymousUserId, { anonymous: true });
};

export const pushAd = async (adId, userId) =>
  database.ref(`ads/byUser/${userId}/${adId}`).set(true);
