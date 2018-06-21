import { handleActions } from 'redux-actions';
import * as types from './types';

const initialState = false;

export default handleActions(
  {
    [types.OPEN]: () => true,

    [types.CLOSE]: () => false,
  },
  initialState,
);
