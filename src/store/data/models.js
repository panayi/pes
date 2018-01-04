import * as R from 'ramda';
import * as modelTypes from 'constants/modelTypes';
import { modelConnectionsFactory } from 'lib/connectData';
import { selectors as authSelectors } from 'store/auth';
import * as constants from './constants';

const createModelConnections = modelConnectionsFactory(constants.DATA_PATH);

export const categories = createModelConnections(modelTypes.CATEGORIES);
export const users = createModelConnections(modelTypes.USERS);
export const ads = createModelConnections(modelTypes.ADS);
export const myAds = createModelConnections(
  R.compose(uid => [modelTypes.MY_ADS, uid], authSelectors.uidSelector),
);
export const pendingAds = createModelConnections(modelTypes.PENDING_ADS);
export const conversations = createModelConnections(
  R.compose(uid => [modelTypes.CONVERSATIONS, uid], authSelectors.uidSelector),
);
