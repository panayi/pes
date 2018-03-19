import * as R from 'ramda';
import { handleActions } from 'redux-actions';
import * as types from './types';
import * as constants from './constants';

export const initialState = {
  [constants.CATEGORY_KEY]: null,
  [constants.LOCATION_KEY]: null,
  [constants.PRICE_KEY]: {
    [constants.PRICE_MIN_KEY]: '',
    [constants.PRICE_MAX_KEY]: '',
  },
  [constants.QUERY_KEY]: '',
  [constants.SORT_BY_KEY]: null,
  [constants.USER_KEY]: null,
  [constants.SOLD_KEY]: null,
  [constants.IDS_KEY]: null,
};

const priceReducer = handleActions(
  {
    [types.SET_PARAMS_FROM_PROPS]: (state, { payload }) =>
      R.merge(state, payload),
    [types.SET_CATEGORY]: (state, { payload }) =>
      R.assoc(constants.CATEGORY_KEY, payload, state),
    [types.SET_LOCATION]: (state, { payload }) =>
      R.assoc(constants.LOCATION_KEY, payload, state),
    [types.SET_PRICE]: (state, { payload }) =>
      R.assoc(constants.PRICE_KEY, payload, state),
    [types.SET_QUERY]: (state, { payload }) =>
      R.assoc(constants.QUERY_KEY, payload, state),
    [types.SET_SORT_BY]: (state, { payload }) =>
      R.assoc(constants.SORT_BY_KEY, payload, state),
    [types.SET_USER]: (state, { payload }) =>
      R.assoc(constants.USER_KEY, payload, state),
    [types.SET_SOLD]: (state, { payload }) =>
      R.assoc(constants.SOLD_KEY, payload, state),
    [types.SET_IDS]: (state, { payload }) =>
      R.assoc(constants.IDS_KEY, payload, state),
    [types.RESET_CATEGORY]: state =>
      R.assoc(
        constants.CATEGORY_KEY,
        initialState[constants.CATEGORY_KEY],
        state,
      ),
    [types.RESET_LOCATION]: state =>
      R.assoc(
        constants.LOCATION_KEY,
        initialState[constants.LOCATION_KEY],
        state,
      ),
    [types.RESET_PRICE]: state =>
      R.assoc(constants.PRICE_KEY, initialState[constants.PRICE_KEY], state),
    [types.RESET_QUERY]: state =>
      R.assoc(constants.QUERY_KEY, initialState[constants.QUERY_KEY], state),
    [types.RESET_SORT_BY]: state =>
      R.assoc(
        constants.SORT_BY_KEY,
        initialState[constants.SORT_BY_KEY],
        state,
      ),
    [types.RESET_USER]: state =>
      R.assoc(constants.USER_KEY, initialState[constants.USER_KEY], state),
    [types.RESET_SOLD]: state =>
      R.assoc(constants.SOLD_KEY, initialState[constants.SOLD_KEY], state),
    [types.RESET_IDS]: state =>
      R.assoc(constants.IDS_KEY, initialState[constants.IDS_KEY], state),
  },
  initialState,
);

export default priceReducer;
