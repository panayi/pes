import * as R from 'ramda';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as types from './types';
import * as constants from './constants';

const initialState = {
  status: constants.AD_CREATE_IDLE_STATE,
  error: null,
};

const createStatusReducer = handleActions(
  {
    [types.AD_CREATE_PENDING]: R.always(constants.AD_CREATE_PENDING_STATE),

    [types.AD_CREATE_FAILED]: R.always(constants.AD_CREATE_FAILED_STATE),

    [types.AD_CREATE_COMPLETED]: R.always(constants.AD_CREATE_COMPLETED_STATE),

    [types.AD_CREATE_RESET]: R.always(initialState.status),
  },
  initialState.status,
);

const createErrorReducer = handleActions(
  {
    [types.AD_CREATE_PENDING]: R.always(initialState.error),

    [types.AD_CREATE_FAILED]: (state, { payload }) => payload,

    [types.AD_CREATE_COMPLETED]: R.always(initialState.error),

    [types.AD_CREATE_RESET]: R.always(initialState.error),
  },
  initialState.error,
);

export default combineReducers({
  [constants.CREATE_AD_STATUS_KEY]: createStatusReducer,
  [constants.CREATE_AD_ERROR_KEY]: createErrorReducer,
});
