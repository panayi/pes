import { handleAction } from 'redux-actions';
import * as types from './types';

const initialState = {};

const rawParamsReducer = handleAction(
  types.SET_RAW_PARAMS,
  (state, { payload }) => payload || initialState,
  initialState,
);

export default rawParamsReducer;
