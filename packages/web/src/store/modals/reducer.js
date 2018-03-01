import * as R from 'ramda';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as types from './types';
import * as constants from './constants';

const initialState = {
  open: {},
  modalProps: {},
  contentProps: {},
};

const openReducer = handleActions(
  {
    [types.OPEN_MODAL]: (state, { payload: { id } }) =>
      R.assoc(id, true, state),

    [types.CLOSE_MODAL]: (state, { payload: id }) => R.dissoc(id, state),
  },
  initialState.open,
);

const modalPropsReducer = handleActions(
  {
    [types.SET_MODAL_PROPS]: (state, { payload: { id, ...modalProps } }) =>
      R.assoc(id, modalProps, state),

    [types.UNSET_MODAL_PROPS]: (state, { payload: { id } }) =>
      R.dissoc(id, state),
  },
  initialState.modalProps,
);

const contentPropsReducer = handleActions(
  {
    [types.OPEN_MODAL]: (state, { payload: { id, ...contentProps } }) =>
      R.assoc(id, contentProps, state),

    [types.CLOSE_MODAL]: (state, { payload: id }) => R.dissoc(id, state),
  },
  initialState.contentProps,
);

export default combineReducers({
  [constants.OPEN_KEY]: openReducer,
  [constants.MODAL_PROPS_KEY]: modalPropsReducer,
  [constants.CONTENT_PROPS_KEY]: contentPropsReducer,
});
