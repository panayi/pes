import * as R from 'ramda';
import { handleActions } from 'redux-actions';
import * as types from './types';

const initialState = null;

const activeConversation = handleActions(
  {
    [types.SET_ACTIVE_CONVERSATION]: (state, { payload }) => payload,
    [types.RESET_ACTIVE_CONVERSATION]: R.always(initialState),
  },
  initialState,
);

export default activeConversation;
