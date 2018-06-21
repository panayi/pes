import * as R from 'ramda';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as types from './types';

const initialState = {
  selected: null,
  query: {},
};

const selectedReducer = handleActions(
  {
    [types.SET_SELECTED]: (state, { payload }) =>
      R.assoc(payload.id, payload.value, state),
  },
  initialState.selected,
);

const queryReducer = handleActions(
  {
    [types.SET_QUERY]: (state, { payload }) =>
      R.assoc(payload.id, payload.value, state),
  },
  initialState.query,
);

export default combineReducers({
  selected: selectedReducer,
  query: queryReducer,
});
