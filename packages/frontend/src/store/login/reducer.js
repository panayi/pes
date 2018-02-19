import * as R from 'ramda';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { constants as firebaseConstants } from 'react-redux-firebase';
import * as types from './types';
import * as constants from './constants';

const initialState = null;

const statusReducer = handleActions(
  {
    [types.LOGIN_STARTED]: R.always(constants.LOGIN_PENDING_STATUS),
    [types.LOGIN_SUCCEEDED]: R.always(constants.LOGIN_SUCCESS_STATUS),
    [types.LOGIN_FAILED]: R.always(constants.LOGIN_FAIL_STATUS),
    [types.LOGIN_RESET]: R.always(initialState),
    [firebaseConstants.actionTypes.LOGOUT]: R.always(initialState),
  },
  initialState,
);

export default combineReducers({
  [constants.STATUS_KEY]: statusReducer,
});
