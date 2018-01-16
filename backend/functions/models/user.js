import * as R from 'ramda';
import { database } from 'lib/firebaseClient';
import withSnapshot from 'utils/withSnapshot';

export const get = async userId =>
  database.ref(`/users/${userId}`).once('value');

export const getAnonymousUserId = withSnapshot(async userSnapshot => {
  const user = userSnapshot.val();
  return R.prop('anonymousUserId', user);
});

export const unsetAnonymousUser = async userRef =>
  userRef.child('anonymousUserId').remove();

export const pushAd = async (adId, userId) =>
  database.ref(`ads/byUser/${userId}/${adId}`).set(true);

export const setIp = async (ip, userId) =>
  database
    .ref(`/users/${userId}`)
    .child('ip')
    .set(ip);
