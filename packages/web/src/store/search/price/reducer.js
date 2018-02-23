import { handleAction } from 'redux-actions';
import * as types from './types';

const initialState = {
  min: '',
  max: '',
};

const priceReducer = handleAction(
  types.SET_PRICE,
  (state, { payload }) => payload,
  initialState,
);

export default priceReducer;
