import { handleAction } from 'redux-actions';
import * as types from './types';

const initialState = null;

export default handleAction(
  [types.RECEIVE_LINKED_ACCOUNTS],
  (state, { payload }) => payload,
  initialState,
);
