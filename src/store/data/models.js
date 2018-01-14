import { createSelector } from 'reselect';
import * as modelPaths from 'constants/modelPaths';
import { modelConnectionsFactory } from 'lib/connectData';
import propSelector from 'utils/propSelector';
import { selectors as authSelectors } from 'store/auth';
import { selectors as i18nSelectors } from 'store/i18n';
import * as constants from './constants';

const createModelConnections = modelConnectionsFactory(constants.DATA_PATH);

export const locales = createModelConnections(
  createSelector(
    i18nSelectors.languageSelector,
    propSelector('_translationsNamespace'),
    modelPaths.LOCALES,
  ),
);
export const categories = createModelConnections(modelPaths.CATEGORIES);
export const users = createModelConnections(modelPaths.USERS);
export const ads = createModelConnections(modelPaths.ADS);
export const adImages = adIdSelector =>
  createModelConnections(createSelector(adIdSelector, modelPaths.AD_IMAGES));
export const draftAd = createModelConnections(
  createSelector(authSelectors.uidSelector, modelPaths.DRAFT_AD),
  { singleton: true },
);
export const adsByUser = createModelConnections(
  createSelector(authSelectors.uidSelector, modelPaths.ADS_BY_USER),
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
