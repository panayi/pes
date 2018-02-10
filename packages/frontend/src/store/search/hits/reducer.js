import * as R from 'ramda';
import { handleActions } from 'redux-actions';
import * as pageTypes from '../page/types';
import * as types from './types';

const initialState = [];

const hitsReducer = handleActions(
  {
    [types.RECEIVE_HITS]: (state, { payload }) => payload,

    [pageTypes.RESET_PAGE]: R.always(initialState),
  },
  initialState,
);

export default hitsReducer;
