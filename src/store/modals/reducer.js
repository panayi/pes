import * as R from 'ramda';
import { handleActions } from 'redux-actions';
import * as types from './types';

const initialState = {};

export default handleActions({
  [types.SHOW_MODAL]: (state, { payload: { id, ...modalProps } }) => (
    R.assoc(id, modalProps, state)
  ),

  [types.WILL_HIDE_MODAL]: (state, { payload: id }) => (
    R.assocPath([id, 'willHide'], true, state)
  ),

  [types.HIDE_MODAL]: (state, { payload: id }) => R.dissoc(id, state),
}, initialState);
