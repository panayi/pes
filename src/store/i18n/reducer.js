import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as types from './types';

const initialState = 'en';

const languageReducer = handleActions(
  {
    [types.SET_LANGUAGE]: (state, { payload }) => payload,
  },
  initialState,
);

export default combineReducers({
  language: languageReducer,
});
