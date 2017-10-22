import * as R from 'ramda';
import { combineReducers } from 'redux';
import { handleActions, combineActions } from 'redux-actions';
import * as types from './types';
import * as constants from './constants';

const initialState = {
  status: constants.STATUS_IDLE,
  confirmationResult: null,
  error: null,
};

const statusReducer = handleActions({
  [types.RESET]: R.always(initialState.status),
  [types.SMS_SEND_STARTED]: R.always(constants.STATUS_SMS_SEND_STARTED),
  [types.SMS_SEND_SUCCEEDED]: R.always(constants.STATUS_SMS_SEND_SUCCEEDED),
  [types.SMS_SEND_FAILED]: R.always(constants.STATUS_SMS_SEND_FAILED),
  [types.CODE_VALIDATION_STARTED]: R.always(constants.STATUS_CODE_VALIDATION_STARTED),
  [types.CODE_VALIDATION_SUCCEEDED]: R.always(constants.STATUS_CODE_VALIDATION_SUCCEEDED),
  [types.CODE_VALIDATION_FAILED]: R.always(constants.STATUS_CODE_VALIDATION_FAILED),
}, initialState.status);

const confirmationResultResetActionTypes = combineActions(
  types.RESET,
  types.SMS_SEND_STARTED,
  types.SMS_SEND_FAILED,
  types.CODE_VALIDATION_FAILED,
);

const confirmationResultReducer = handleActions({
  [confirmationResultResetActionTypes]: R.always(initialState.confirmationResult),
  [types.SMS_SEND_SUCCEEDED]: (state, { payload }) => payload,
}, initialState.confirmationResult);

const errorResetActionTypes = combineActions(
  types.RESET,
  types.SMS_SEND_STARTED,
  types.SMS_SEND_SUCCEEDED,
  types.CODE_VALIDATION_STARTED,
  types.CODE_VALIDATION_SUCCEEDED,
);

const errorSetActionTypes = combineActions(
  types.SMS_SEND_FAILED,
  types.CODE_VALIDATION_FAILED,
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
