import R from 'ramda';
import { combineReducers } from 'redux';
import { handleActions, combineActions } from 'redux-actions';
import * as constants from './withPhoneNumber.constants';

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  status: constants.STATUS_IDLE,
  confirmationResult: null,
  error: null,
};

const statusReducer = handleActions({
  [constants.RESET]: R.always(initialState.status),
  [constants.SMS_SEND_STARTED]: R.always(constants.STATUS_SMS_SEND_STARTED),
  [constants.SMS_SEND_SUCCEEDED]: R.always(constants.STATUS_SMS_SEND_SUCCEEDED),
  [constants.SMS_SEND_FAILED]: R.always(constants.STATUS_SMS_SEND_FAILED),
  [constants.CODE_VALIDATION_STARTED]: R.always(constants.STATUS_CODE_VALIDATION_STARTED),
  [constants.CODE_VALIDATION_SUCCEEDED]: R.always(constants.STATUS_CODE_VALIDATION_SUCCEEDED),
  [constants.CODE_VALIDATION_FAILED]: R.always(constants.STATUS_CODE_VALIDATION_FAILED),
}, initialState.status);

const confirmationResultResetActionTypes = combineActions(
  constants.RESET,
  constants.SMS_SEND_STARTED,
  constants.SMS_SEND_FAILED,
  constants.CODE_VALIDATION_FAILED,
);

const confirmationResultReducer = handleActions({
  [confirmationResultResetActionTypes]: R.always(initialState.confirmationResult),
  [constants.SMS_SEND_SUCCEEDED]: (state, { payload }) => payload,
}, initialState.confirmationResult);

const errorResetActionTypes = combineActions(
  constants.RESET,
  constants.SMS_SEND_STARTED,
  constants.SMS_SEND_SUCCEEDED,
  constants.CODE_VALIDATION_STARTED,
  constants.CODE_VALIDATION_SUCCEEDED,
);

const errorSetActionTypes = combineActions(
  constants.SMS_SEND_FAILED,
  constants.CODE_VALIDATION_FAILED,
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
