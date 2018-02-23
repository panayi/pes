import { handleAction } from 'redux-actions';
import * as types from './types';

const initialState = null;

const sortByReducer = handleAction(
  types.SET_SORT_BY,
  (state, { payload }) => payload,
  initialState,
);

export default sortByReducer;
