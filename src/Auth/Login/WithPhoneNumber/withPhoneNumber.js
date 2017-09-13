import R from 'ramda';
import { combineReducers } from 'redux';
import { createAction, handleActions, combineActions } from 'redux-actions';

// ------------------------------------
// Constants
// ------------------------------------
const RESET = 'auth/withPhoneNumber/RESET';
const SMS_SEND_STARTED = 'auth/withPhoneNumber/SMS_SENT_STARTED';
const SMS_SEND_SUCCEEDED = 'auth/withPhoneNumber/SMS_SENT_SUCCEEDED';
const SMS_SEND_FAILED = 'auth/withPhoneNumber/SMS_SENT_FAILED';
const CODE_VALIDATION_STARTED = 'auth/withPhoneNumber/CODE_VALIDATION_STARTED';
const CODE_VALIDATION_SUCCEEDED = 'auth/withPhoneNumber/CODE_VALIDATION_SUCCEEDED';
const CODE_VALIDATION_FAILED = 'auth/withPhoneNumber/CODE_VALIDATION_FAILED';

export const STATUS_IDLE = null;
export const STATUS_SMS_SEND_STARTED = 'smsSendStarted';
export const STATUS_SMS_SEND_SUCCEEDED = 'smsSendSucceeded';
export const STATUS_SMS_SEND_FAILED = 'smsSendFailed';
export const STATUS_CODE_VALIDATION_STARTED = 'codeValidationStarted';
export const STATUS_CODE_VALIDATION_SUCCEEDED = 'codeValidationSucceeded';
export const STATUS_CODE_VALIDATION_FAILED = 'codeValidationFailed';

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  status: STATUS_IDLE,
  confirmationResult: null,
  error: null,
};

const statusReducer = handleActions({
  [RESET]: R.always(initialState.status),
  [SMS_SEND_STARTED]: R.always(STATUS_SMS_SEND_STARTED),
  [SMS_SEND_SUCCEEDED]: R.always(STATUS_SMS_SEND_SUCCEEDED),
  [SMS_SEND_FAILED]: R.always(STATUS_SMS_SEND_FAILED),
  [CODE_VALIDATION_STARTED]: R.always(STATUS_CODE_VALIDATION_STARTED),
  [CODE_VALIDATION_SUCCEEDED]: R.always(STATUS_CODE_VALIDATION_SUCCEEDED),
  [CODE_VALIDATION_FAILED]: R.always(STATUS_CODE_VALIDATION_FAILED),
}, initialState.status);

const confirmationResultResetActionTypes = combineActions(
  RESET,
  SMS_SEND_STARTED,
  SMS_SEND_FAILED,
  CODE_VALIDATION_FAILED,
);

const confirmationResultReducer = handleActions({
  [confirmationResultResetActionTypes]: R.always(initialState.confirmationResult),
  [SMS_SEND_SUCCEEDED]: (state, { payload }) => payload,
}, initialState.confirmationResult);

const errorResetActionTypes = combineActions(
  RESET,
  SMS_SEND_STARTED,
  SMS_SEND_SUCCEEDED,
  CODE_VALIDATION_STARTED,
  CODE_VALIDATION_SUCCEEDED,
);

const errorSetActionTypes = combineActions(
  SMS_SEND_FAILED,
  CODE_VALIDATION_FAILED,
);

const errorReducer = handleActions({
  [errorResetActionTypes]: R.always(initialState.error),
  [errorSetActionTypes]: (state, { payload }) => payload,
}, initialState.error);

export default combineReducers({
  status: statusReducer,
  confirmationResult: confirmationResultReducer,
  error: errorReducer,
});

// ------------------------------------
// Actions
// ------------------------------------
export const reset = createAction(RESET);
export const sendSmsStart = createAction(SMS_SEND_STARTED);
export const sendSmsSuccess = createAction(SMS_SEND_SUCCEEDED);
export const sendSmsFail = createAction(SMS_SEND_FAILED);
export const codeValidationStart = createAction(CODE_VALIDATION_STARTED);
export const codeValidationSuccess = createAction(CODE_VALIDATION_SUCCEEDED);
export const codeValidationFail = createAction(CODE_VALIDATION_FAILED);

export const actions = {
  reset,
  sendSmsStart,
  sendSmsSuccess,
  sendSmsFail,
  codeValidationStart,
  codeValidationSuccess,
  codeValidationFail,
};

// ------------------------------------
// Selectors
// ------------------------------------

const WITH_PHONE_NUMBER_PATH = ['auth', 'withPhoneNumber'];

export const statusSelector = R.path([...WITH_PHONE_NUMBER_PATH, 'status']);

export const confirmationResultSelector = R.path([...WITH_PHONE_NUMBER_PATH, 'confirmationResult']);

export const errorSelector = R.path([...WITH_PHONE_NUMBER_PATH, 'error']);

export const selectors = {
  statusSelector,
  confirmationResultSelector,
  errorSelector,
};
