import * as R from 'ramda';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as searchTypes from '../types';
import * as constants from './constants';

const initialState = {
  status: null,
  error: null,
};

const statusReducer = handleActions(
  {
    [searchTypes.SEARCH_REQUEST_STARTED]: R.always(constants.STATUS_PENDING),
    [searchTypes.SEARCH_REQUEST_FAILED]: R.always(constants.STATUS_FAIL),
    [searchTypes.SEARCH_REQUEST_SUCCEEDED]: R.always(constants.STATUS_SUCCESS),
  },
  initialState.status,
);

const errorReducer = handleActions(
  {
    [searchTypes.SEARCH_REQUEST_STARTED]: R.always(initialState.error),
    [searchTypes.SEARCH_REQUEST_FAILED]: (status, { payload }) => payload,
    [searchTypes.SEARCH_REQUEST_SUCCEEDED]: R.always(initialState.error),
  },
  initialState.error,
);

export default combineReducers({
  status: statusReducer,
  error: errorReducer,
});
