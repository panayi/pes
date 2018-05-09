import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as types from './types';
import * as constants from './constants';

const initialState = null;

const ipReducer = handleActions(
  {
    [types.SET_IP]: (state, { payload }) => payload,
    [types.SET_USER_INFO]: (state, { payload }) => payload[constants.IP_KEY],
  },
  initialState,
);

const locationReducer = handleActions(
  {
    [types.SET_LOCATION]: (state, { payload }) => payload,
    [types.SET_USER_INFO]: (state, { payload }) =>
      payload[constants.LOCATION_KEY],
  },
  initialState,
);

const languageReducer = handleActions(
  {
    [types.SET_LANGUAGE]: (state, { payload }) => payload,
    [types.SET_USER_INFO]: (state, { payload }) =>
      payload[constants.LANGUAGE_KEY],
  },
  initialState,
);

const isBotReducer = handleActions(
  {
    [types.SET_IS_BOT]: (state, { payload }) => payload,
    [types.SET_USER_INFO]: (state, { payload }) =>
      payload[constants.IS_BOT_KEY],
  },
  initialState,
);

export default combineReducers({
  [constants.IP_KEY]: ipReducer,
  [constants.LOCATION_KEY]: locationReducer,
  [constants.LANGUAGE_KEY]: languageReducer,
  [constants.IS_BOT_KEY]: isBotReducer,
});
