import { handleAction } from 'redux-actions';
import * as types from './types';

const initialState = '';

const queryReducer = handleAction(
  types.SET_QUERY,
  (state, { payload }) => payload,
  initialState,
);

export default queryReducer;
