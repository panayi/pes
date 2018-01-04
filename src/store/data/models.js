import { createSelector } from 'reselect';
import * as modelTypes from 'constants/modelTypes';
import { modelConnectionsFactory } from 'lib/connectData';
import propSelector from 'utils/propSelector';
import { selectors as authSelectors } from 'store/auth';
import * as constants from './constants';

const createModelConnections = modelConnectionsFactory(constants.DATA_PATH);

export const categories = createModelConnections(modelTypes.CATEGORIES);
export const users = createModelConnections(modelTypes.USERS);
export const ads = createModelConnections(modelTypes.ADS);
export const myAds = createModelConnections(
  createSelector(authSelectors.uidSelector, uid => [modelTypes.MY_ADS, uid]),
);
export const pendingAds = createModelConnections(modelTypes.PENDING_ADS);
export const conversations = createModelConnections(
  createSelector(authSelectors.uidSelector, uid => [
    modelTypes.CONVERSATIONS,
    uid,
  ]),
);
export const messages = createModelConnections(
  createSelector(propSelector('ad'), propSelector('buyer'), (ad, buyer) => [
    modelTypes.MESSAGES,
    ad,
    buyer,
  ]),
);
