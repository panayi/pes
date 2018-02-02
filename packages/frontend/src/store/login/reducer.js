import * as R from 'ramda';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { constants as firebaseConstants } from 'react-redux-firebase';
import * as constants from './constants';

const initialState = null;

const statusReducer = handleActions(
  {
    [constants.LOGIN_STARTED]: R.always(constants.LOGIN_PENDING_STATUS),
    [constants.LOGIN_SUCCEEDED]: R.always(constants.LOGIN_SUCCESS_STATUS),
    [constants.LOGIN_FAILED]: R.always(constants.LOGIN_FAIL_STATUS),
    [firebaseConstants.actionTypes.LOGOUT]: R.always(initialState),
  },
  initialState,
);

export default combineReducers({
  [constants.STATUS_KEY]: statusReducer,
});
