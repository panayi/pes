import * as R from 'ramda';
import { createSelector } from 'reselect';
import * as constants from './constants';

export const statusSelector = R.path(constants.STATUS_PATH);

const createFlagSelector = value =>
  createSelector(statusSelector, R.equals(value));

export const pendingSelector = createFlagSelector(
  constants.LOGIN_PENDING_STATUS,
);
export const succeededSelector = createFlagSelector(
  constants.LOGIN_SUCCESS_STATUS,
);
export const failedSelector = createFlagSelector(constants.LOGIN_FAIL_STATUS);
