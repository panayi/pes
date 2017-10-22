import * as R from 'ramda';
import { createSelector } from 'reselect';
import * as constants from './constants';

const WITH_PHONE_NUMBER_PATH = ['auth', 'withPhoneNumber'];

export const statusSelector = R.path([...WITH_PHONE_NUMBER_PATH, 'status']);

export const confirmationResultSelector = R.path([...WITH_PHONE_NUMBER_PATH, 'confirmationResult']);

export const errorSelector = R.path([...WITH_PHONE_NUMBER_PATH, 'error']);

export const showPhoneNumberFormSelector = createSelector(
  statusSelector,
  R.contains(R.__, [
    constants.STATUS_IDLE,
    constants.STATUS_SMS_SEND_STARTED,
  ]),
);

export const showCodeFormSelector = createSelector(
  statusSelector,
  R.contains(R.__, [
    constants.STATUS_SMS_SEND_SUCCEEDED,
    constants.STATUS_CODE_VALIDATION_SUCCEEDED,
  ]),
);

export const showErrorSelector = createSelector(
  statusSelector,
  R.contains(R.__, [
    constants.STATUS_SMS_SEND_FAILED,
    constants.STATUS_CODE_VALIDATION_FAILED,
  ]),
);

export const showLoadingSelector = createSelector(
  statusSelector,
  R.contains(R.__, [
    constants.STATUS_SMS_SEND_STARTED,
    constants.STATUS_CODE_VALIDATION_STARTED,
  ]),
);

export const showTryAgainSelector = createSelector(
  statusSelector,
  R.contains(R.__, [
    constants.STATUS_SMS_SEND_FAILED,
    constants.STATUS_CODE_VALIDATION_FAILED,
  ]),
);
