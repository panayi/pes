import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { database } from 'lib/firebaseClient';
import * as userModel from './user';

export const get = async userId =>
  database.ref(`/ads/draft/${userId}`).once('value');

export const set = async (draftAd, userId) =>
  database.ref(`/ads/draft/${userId}`).set(draftAd);

export const remove = async userId =>
  database.ref(`/ads/draft/${userId}`).remove();

export const getFromAnonymousUser = async userPointer => {
  const anonymousUserId = await userModel.getAnonymousUser(userPointer);

  if (R.isNil(anonymousUserId)) {
    return null;
  }

  return get(anonymousUserId);
};

export const removeFromAnonymousUser = async userPointer => {
  const anonymousUserId = await userModel.getAnonymousUser(userPointer);

  if (!anonymousUserId) {
    return null;
  }

  return remove(anonymousUserId);
};

export const move = async (userSnapshot, userId) => {
  const sourceSnapshot = await getFromAnonymousUser(userSnapshot);

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

  await set(sourceDraftAd, userId);
  return removeFromAnonymousUser(userSnapshot);
};
