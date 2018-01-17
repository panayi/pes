import * as R from 'ramda';

const createModelPath = path => {
  path.string = R.join('/', path); // eslint-disable-line no-param-reassign
  return path;
};

export const LOCALES = (language, namespace) =>
  createModelPath(['locales', language, namespace]);
export const CATEGORIES = createModelPath(['categories']);
export const USERS = createModelPath(['users']);
export const ADS = createModelPath(['ads', 'published']);
export const DRAFT_AD = userId => createModelPath(['ads', 'draft', userId]);
export const PENDING_REVIEW_ADS = createModelPath(['ads', 'pendingReview']);
export const ADS_BY_USER = userId => createModelPath(['ads', 'byUser', userId]);
export const AD_IMAGES = adId => createModelPath(['ads', 'images', adId]);
export const CONVERSATIONS = userId =>
  createModelPath(['myConversations', userId]);
export const MESSAGES = (adId, buyerId) =>
  createModelPath(['messages', adId, buyerId]);
