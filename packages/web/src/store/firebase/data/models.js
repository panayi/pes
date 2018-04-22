import { createSelector } from 'reselect';
import * as modelPaths from '@pesposa/core/src/config/modelPaths';
import { modelConnectionsFactory } from 'lib/connectData';
import { selectors as authSelectors } from 'store/firebase/auth';
import * as constants from './constants';

const createModelConnections = modelConnectionsFactory(constants.DATA_PATH);

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
export const users = createModelConnections(modelPaths.USERS);
export const profiles = userIdSelector =>
  createModelConnections(createSelector(userIdSelector, modelPaths.PROFILES), {
    singleton: true,
  });
export const ads = legacySelector =>
  createModelConnections(createSelector(legacySelector, modelPaths.ADS));
export const pendingReviewAds = createModelConnections(
  modelPaths.PENDING_REVIEW_ADS,
);
export const adImages = adIdSelector =>
  createModelConnections(createSelector(adIdSelector, modelPaths.AD_IMAGES));
export const draftAd = createModelConnections(
  createSelector(authSelectors.uidSelector, modelPaths.DRAFT_AD),
  { singleton: true },
);
export const adsByUser = userIdSelector =>
  createModelConnections(
    createSelector(userIdSelector, modelPaths.ADS_BY_USER),
  );
export const favorites = createModelConnections(
  createSelector(authSelectors.uidSelector, modelPaths.FAVORITES),
);
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

// BETA
export const betaUsers = createModelConnections(modelPaths.BETA_USERS);
