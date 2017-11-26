import * as R from 'ramda';
import { handleActions } from 'redux-actions';
import * as types from './types';

const initialState = null;

export default handleActions({
  [types.SHOW_MODAL]: (state, { payload }) => payload,

  [types.WILL_HIDE_MODAL]: R.assoc('willHide', true),

  [types.HIDE_MODAL]: R.always(initialState),
}, initialState);
