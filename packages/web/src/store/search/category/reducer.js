import { handleAction } from 'redux-actions';
import * as types from './types';

const initialState = null;

const categoryReducer = handleAction(
  types.SET_CATEGORY,
  (state, { payload }) => payload || initialState,
  initialState,
);

export default categoryReducer;
