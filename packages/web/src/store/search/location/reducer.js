import { handleAction } from 'redux-actions';
import * as types from './types';

const initialState = null;

const locationReducer = handleAction(
  types.SET_LOCATION,
  (state, { payload }) => payload,
  initialState,
);

export default locationReducer;
