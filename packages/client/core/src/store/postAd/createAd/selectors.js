import * as R from 'ramda';
import { createSelector } from 'reselect';
import * as constants from './constants';

const createAdStatusSelector = R.path(constants.CREATE_AD_STATUS_PATH);
export const createAdErrorSelector = R.path(constants.CREATE_AD_ERROR_PATH);

export const isCreateAdIdleSelector = createSelector(
  createAdStatusSelector,
  R.equals(constants.AD_CREATE_IDLE_STATE),
);

export const isCreateAdPendingSelector = createSelector(
  createAdStatusSelector,
  R.equals(constants.AD_CREATE_PENDING_STATE),
);

export const isCreateAdFailedSelector = createSelector(
  createAdStatusSelector,
  R.equals(constants.AD_CREATE_FAILED_STATE),
);

export const isCreateAdCompletedSelector = createSelector(
  createAdStatusSelector,
  R.equals(constants.AD_CREATE_COMPLETED_STATE),
);
