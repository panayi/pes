/* @flow */
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { database } from 'lib/firebaseClient';

export const get = async (userId: ID) =>
  database.ref(`/ads/draft/${userId}`).once('value');

export const set = async (draftAd: DraftAd, userId: ID) =>
  database.ref(`/ads/draft/${userId}`).set(draftAd);

export const remove = async (userId: ID) =>
  database.ref(`/ads/draft/${userId}`).remove();

export const move = async (sourceUserId: ID, targetUserId: ID) => {
  const sourceSnapshot = await get(sourceUserId);

  if (R.isNil(sourceSnapshot)) {
    return null;
  }

  const sourceDraftAd = sourceSnapshot.val();
  const isSourceDraftAdEmtpy = R.compose(R.all(isNilOrEmpty), R.values)(
    sourceDraftAd,
  );

  if (isSourceDraftAdEmtpy) {
    return null;
  }

  await set(sourceDraftAd, targetUserId);
  return remove(sourceUserId);
};
