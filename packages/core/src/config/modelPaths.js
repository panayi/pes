import * as R from 'ramda';
import makeArray from '../utils/makeArray';

const createModelPath = path => {
  path.string = R.join('/', path); // eslint-disable-line no-param-reassign
  return path;
};

export const getConversationId = (adId, buyerId) => `${adId}_${buyerId}`;

export const TRANSLATIONS = (language, namespace) =>
  createModelPath(['translations', language, ...makeArray(namespace)]);
export const COUNTRIES = createModelPath(['countries']);
export const CATEGORIES = createModelPath(['categories']);
export const USERS = createModelPath(['users']);
export const PROFILES = userId => createModelPath(['users', userId, 'profile']);
export const ADS = legacy =>
  legacy
    ? createModelPath(['ads', 'legacy'])
    : createModelPath(['ads', 'published']);
export const DRAFT_AD = userId => createModelPath(['ads', 'draft', userId]);
export const PENDING_REVIEW_ADS = createModelPath(['ads', 'pendingReview']);
export const ADS_BY_USER = userId => createModelPath(['ads', 'byUser', userId]);
export const AD_IMAGES = adId => createModelPath(['ads', 'images', adId]);
export const FAVORITES = userId => createModelPath(['favorites', userId]);
export const CONVERSATIONS = userId =>
  createModelPath(['myConversations', userId]);
export const CONVERSATION = (userId, adId, buyerId) =>
  createModelPath([
    'myConversations',
    userId,
    getConversationId(adId, buyerId),
  ]);
export const MESSAGES = (adId, buyerId) =>
  createModelPath(['messages', adId, buyerId]);
export const SUPPORT_MESSAGES = createModelPath(['support']);

// BETA
export const BETA_USERS = createModelPath(['betaUsers']);
