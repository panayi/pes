/* @flow */
import * as R from 'ramda';
import { createSelector } from 'reselect';
import propsSelector from 'utils/propsSelector';
import { PENDING_ADS } from 'services/connectData/types';
import { uidSelector, profilePropSelector } from 'store/auth/selectors';
import * as constants from './constants';

export const createAdPath = ['ad', 'create'];

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
  R.compose(R.prop('adId'), propsSelector),
  adId => `ads/${adId}/images`,
);

// pendingAdImagesSelector :: State -> Object | Nil
export const pendingAdImagesPathSelector = createSelector(
  uidSelector,
  R.unless(R.isNil, uid => `${PENDING_ADS}/${uid}/images`),
);

// pendingAdSelector :: Props -> Ad | Nil
//   Ad = Object
export const pendingAdSelector = createSelector(
  propsSelector,
  R.prop('pendingAd'),
);

export const currentUserAdIdsSelector = createSelector(
  profilePropSelector(['ads']),
  R.keys,
);
