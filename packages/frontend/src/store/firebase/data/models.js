import { createSelector } from 'reselect';
import { modelPaths } from 'pesposa-config';
import { propSelector } from 'pesposa-utils';
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
  );
export const countries = createModelConnections(modelPaths.COUNTRIES);
export const categories = createModelConnections(modelPaths.CATEGORIES);
export const users = createModelConnections(modelPaths.USERS);
export const profiles = userIdSelector =>
  createModelConnections(createSelector(userIdSelector, modelPaths.PROFILES), {
    singleton: true,
  });
export const ads = createModelConnections(modelPaths.ADS);
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
export const conversations = createModelConnections(
  createSelector(authSelectors.uidSelector, modelPaths.CONVERSATIONS),
);
export const messages = createModelConnections(
  createSelector(
    propSelector('ad'),
    propSelector('buyer'),
    modelPaths.MESSAGES,
  ),
);