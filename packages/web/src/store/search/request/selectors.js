import * as R from 'ramda';
import * as constants from './constants';

export const statusSelector = R.path(constants.STATUS_PATH);

export const errorSelector = R.path(constants.ERROR_PATH);

export const isRequestPendingSelector = R.compose(
  R.equals(constants.STATUS_PENDING),
  statusSelector,
);

export const isRequestSuccessSelector = R.compose(
  R.equals(constants.STATUS_SUCCESS),
  statusSelector,
);

export const isRequestFailSelector = R.compose(
  R.equals(constants.STATUS_FAIL),
  statusSelector,
);
