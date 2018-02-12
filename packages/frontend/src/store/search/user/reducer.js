import { handleAction } from 'redux-actions';
import * as types from './types';

const initialState = null;

const userReducer = handleAction(
  types.SET_USER,
  (state, { payload }) => payload,
  initialState,
);

export default userReducer;
