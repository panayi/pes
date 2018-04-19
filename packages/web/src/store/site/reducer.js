import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as types from './types';
import * as constants from './constants';

const initialState = null;

const countryReducer = handleActions(
  {
    [types.SET_COUNTRY]: (state, { payload }) => payload,
  },
  initialState,
);

export default combineReducers({
  [constants.COUNTRY_KEY]: countryReducer,
});
