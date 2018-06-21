import { handleAction } from 'redux-actions';
import * as types from './types';

const initialState = 0;

const scrollPositionReducer = handleAction(
  types.SET_SCROLL_POSITION,
  (state, { payload }) => payload,
  initialState,
);

export default scrollPositionReducer;
