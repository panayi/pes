import * as R from 'ramda';
import { ensureArray } from 'ramda-adjunct';
import * as adStatuses from './adStatuses';
import * as sellerTypes from './sellerTypes';
import * as taskTypes from './taskTypes';

// Helpers
const createModelPath = path => {
  path.string = R.join('/', path); // eslint-disable-line no-param-reassign
  return path;
};

export const getConversationId = (adId, buyerId) => `${adId}_${buyerId}`;

// General
export const TRANSLATIONS = (language, namespace) =>
  createModelPath(['translations', language, ...ensureArray(namespace)]);
export const COUNTRY_FLAGS = createModelPath(['countryFlags']);
export const CATEGORIES = createModelPath(['categories']);
export const LOCATIONS = createModelPath(['locations']);
export const REJECTION_REASONS = createModelPath(['rejectionReasons']);
export const MESSAGE_TEMPLATES = (templateId, language) =>
  createModelPath(['messageTemplates', templateId, language]);

// Ads
export const SOURCES = createModelPath(['sources']);
export const DRAFTS = userId => createModelPath(['drafts', userId]);
export const ADS = createModelPath(['ads']);
export const SELLER_ADS = (sellerId, status = adStatuses.PUBLISHED) =>
  createModelPath(['sellerAds', sellerId, status]);

// Tasks
export const TASKS = taskType => createModelPath(['tasks', taskType]);
export const SUBMISSION_TASKS = createModelPath([
  'tasks',
  taskTypes.SUBMISSION,
]);
export const REVIEW_AD_TASKS = createModelPath(['tasks', taskTypes.REVIEW_AD]);
export const CONVERT_EXTERNAL_USER_TASKS = createModelPath([
  'tasks',
  taskTypes.CONVERT_EXTERNAL_USER,
]);
export const TASK_COUNTERS = taskType =>
  createModelPath(['taskCounters', taskType]);
export const COMPLETED_SUBMISSION_TASKS = createModelPath([
  'completedTasks',
  taskTypes.SUBMISSION,
]);
export const COMPLETED_REVIEW_AD_TASKS = createModelPath([
  'completedTasks',
  taskTypes.REVIEW_AD,
]);
export const COMPLETED_CONVERT_EXTERNAL_USER_TASKS = createModelPath([
  'completedTasks',
  taskTypes.CONVERT_EXTERNAL_USER,
]);

// Users
export const USERS = createModelPath(['users']);
export const EXTERNAL_USERS = createModelPath(['externalUsers']);
export const EXTERNAL_USER_CODES = createModelPath(['externalUserCodes']);
export const PROFILES = (userId, userType) =>
  userType === sellerTypes.EXTERNAL_USER
    ? createModelPath(['externalUsers', userId, 'profile'])
    : createModelPath(['users', userId, 'profile']);
export const AVATARS = (userId, userType) =>
  userType === sellerTypes.EXTERNAL_USER
    ? createModelPath(['externalUsers', userId, 'avatar'])
    : createModelPath(['users', userId, 'avatar']);
export const FAVORITES = userId => createModelPath(['favorites', userId]);

// Messages
export const ALL_CONVERSATIONS = createModelPath(['myConversations']);
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
export const RATINGS = userId => createModelPath(['ratings', userId]);
