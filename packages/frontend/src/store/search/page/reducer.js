import * as R from 'ramda';
import { handleActions } from 'redux-actions';
import * as types from './types';

const initialState = 0;

const pageReducer = handleActions(
  {
    [types.NEXT_PAGE]: R.inc,

    [types.RESET_PAGE]: R.always(initialState),
  },
  initialState,
);

export default pageReducer;
