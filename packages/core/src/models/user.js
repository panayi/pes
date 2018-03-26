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
  const anonymousUser = (await get(anonymousUserId)).val();
  const user = (await get(userId)).val();

  if (isNilOrEmpty(user)) {
    throw new Error(`User with id=${userId} does not exist`);
  }

  // Move draft ad from anonymousUser to user
  await draftAdModel.move(anonymousUserId, userId);

  // Move {`ip`, `location`} from anonymousUser to user
  if (!isNilOrEmpty(anonymousUser)) {
    const migrateProps = R.pick(['ip', 'location'], anonymousUser);
    await update(migrateProps, userId);
    await remove(anonymousUserId);
  }
};

export const associateAd = async (adId: ID, userId: ID) =>
  database.ref(`ads/byUser/${userId}/${adId}`).set(true);
