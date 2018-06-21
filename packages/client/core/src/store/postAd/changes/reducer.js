import * as R from 'ramda';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as types from './types';
import * as constants from './constants';

const initialState = [];

const createdAdsReducer = handleActions(
  {
    [types.AD_CREATED]: (state, { payload }) => R.prepend(payload, state),
  },
  initialState,
);

const deletedAdsReducer = handleActions(
  {
    [types.AD_DELETED]: (state, { payload }) => R.prepend(payload, state),
  },
  initialState,
);

export default combineReducers({
  [constants.CREATED_ADS_KEY]: createdAdsReducer,
  [constants.DELETED_ADS_KEY]: deletedAdsReducer,
});
