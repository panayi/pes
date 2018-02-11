import * as R from 'ramda';
import { handleActions } from 'redux-actions';
import * as types from './types';

const initialState = null;

const pageReducer = handleActions(
  {
    [types.NEXT_PAGE]: R.ifElse(R.isNil, R.always(0), R.inc),

    [types.RESET_PAGE]: R.always(initialState),
  },
  initialState,
);

export default pageReducer;
