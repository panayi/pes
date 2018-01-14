/* @flow */
import * as R from 'ramda';
import { createSelector } from 'reselect';
import * as modelPaths from 'constants/modelPaths';
import propSelector from 'utils/propSelector';
import { selectors as authSelectors } from 'store/auth';
import * as constants from './constants';

export const createAdPath = ['postAd', 'create'];

export const createAdSelector = R.path(createAdPath);

export const isCreateAdIdleSelector = createSelector(
  createAdSelector,
  R.equals(constants.AD_CREATE_IDLE_STATE),
);

export const isCreateAdPendingSelector = createSelector(
  createAdSelector,
  R.equals(constants.AD_CREATE_PENDING_STATE),
);

export const isCreateAdCompletedSelector = createSelector(
  createAdSelector,
  R.equals(constants.AD_CREATE_COMPLETED_STATE),
);

// adImagesPathSelector :: Props -> Object | Nil
export const adImagesPathSelector = createSelector(
  propSelector('adId'),
  adId => `adImages/${adId}`,
);

// draftAdImagesPathSelector :: State -> Object | Nil
export const draftAdImagesPathSelector = createSelector(
  authSelectors.uidSelector,
  R.unless(R.isNil, uid => `${modelPaths.DRAFT_AD(uid).string}/images`),
);
