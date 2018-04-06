import * as R from 'ramda';
import { createSelector } from 'reselect';
import * as modelPaths from '@pesposa/core/src/config/modelPaths';
import * as sellerTypes from '@pesposa/core/src/config/sellerTypes';
import * as adStatuses from '@pesposa/core/src/config/adStatuses';
import { modelConnectionsFactory } from '../../../lib/connectData';
import { selectors as authSelectors } from '../auth';
import * as constants from './constants';

const createModelConnections = modelConnectionsFactory(constants.DATA_PATH);

// General
export const translations = (languageSelector, namespaceSelector) =>
  createModelConnections(
    createSelector(
      languageSelector,
      namespaceSelector,
      modelPaths.TRANSLATIONS,
    ),
    { type: 'once' },
  );
export const countryFlags = createModelConnections(modelPaths.COUNTRY_FLAGS, {
  type: 'once',
});
export const categories = createModelConnections(modelPaths.CATEGORIES, {
  type: 'once',
});
export const locations = createModelConnections(modelPaths.LOCATIONS, {
  type: 'once',
});
export const rejectionReasons = createModelConnections(
  modelPaths.REJECTION_REASONS,
  {
    type: 'once',
  },
);
export const messageTemplates = (templateIdSelector, languageSelector) =>
  createModelConnections(
    createSelector(
      templateIdSelector,
      languageSelector,
      modelPaths.MESSAGE_TEMPLATES,
    ),
    { type: 'once', singleton: true },
  );

// Ads
export const sources = createModelConnections(modelPaths.SOURCES);
export const draft = createModelConnections(
  createSelector(authSelectors.uidSelector, modelPaths.DRAFTS),
  { singleton: true },
);
export const ads = createModelConnections(modelPaths.ADS);
export const sellerAds = (
  sellerIdSelector,
  statusSelector = R.always(adStatuses.PUBLISHED),
) =>
  createModelConnections(
    createSelector(sellerIdSelector, statusSelector, modelPaths.SELLER_ADS),
  );

// Tasks
export const submissionTasks = createModelConnections(
  modelPaths.SUBMISSION_TASKS,
);
export const reviewAdTasks = createModelConnections(modelPaths.REVIEW_AD_TASKS);
export const convertExternalUserTasks = createModelConnections(
  modelPaths.CONVERT_EXTERNAL_USER_TASKS,
);
export const taskCounters = taskTypeSelector =>
  createModelConnections(
    createSelector(taskTypeSelector, modelPaths.TASK_COUNTERS),
    {
      singleton: true,
    },
  );
export const completedSubmissionTasks = createModelConnections(
  modelPaths.COMPLETED_SUBMISSION_TASKS,
);
export const completedReviewAdTasks = createModelConnections(
  modelPaths.COMPLETED_REVIEW_AD_TASKS,
);
export const completedConvertExternalUserTasks = createModelConnections(
  modelPaths.COMPLETED_CONVERT_EXTERNAL_USER_TASKS,
);

// Users
export const users = createModelConnections(modelPaths.USERS);
export const externalUsers = createModelConnections(modelPaths.EXTERNAL_USERS);
export const externalUserCodes = createModelConnections(
  modelPaths.EXTERNAL_USER_CODES,
);
export const profiles = (
  userIdSelector,
  userTypeSelector = R.always(sellerTypes.USER),
) =>
  createModelConnections(
    createSelector(userIdSelector, userTypeSelector, modelPaths.PROFILES),
    {
      singleton: true,
    },
  );
export const avatars = (
  userIdSelector,
  userTypeSelector = R.always(sellerTypes.USER),
) =>
  createModelConnections(
    createSelector(userIdSelector, userTypeSelector, modelPaths.AVATARS),
    {
      singleton: true,
    },
  );
export const favorites = createModelConnections(
  createSelector(authSelectors.uidSelector, modelPaths.FAVORITES),
);

// Messages
export const conversations = createModelConnections(
  createSelector(authSelectors.uidSelector, modelPaths.CONVERSATIONS),
);
export const messages = ({ adSelector, buyerSelector }) =>
  createModelConnections(
    createSelector(adSelector, buyerSelector, modelPaths.MESSAGES),
  );
export const rating = createModelConnections(
  createSelector(authSelectors.uidSelector, modelPaths.RATINGS),
  { singleton: true },
);
