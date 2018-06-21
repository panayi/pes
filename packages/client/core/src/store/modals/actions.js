import * as R from 'ramda';
import { createAction } from 'redux-actions';
import * as types from './types';
import * as selectors from './selectors';

export const openModal = createAction(types.OPEN_MODAL, (id, props) =>
  R.merge(props, { id }),
);

export const closeModal = createAction(types.CLOSE_MODAL);

export const setModalProps = createAction(types.SET_MODAL_PROPS, (id, props) =>
  R.merge(props, { id }),
);

export const unsetModalProps = createAction(
  types.UNSET_MODAL_PROPS,
  (id, props) => R.merge(props, { id }),
);

export const toggleModal = (id, props) => (dispatch, getState) => {
  const isOpen = selectors.openSelector(getState(), { id });

  if (isOpen) {
    return dispatch(closeModal(id));
  }

  return dispatch(openModal(id, props));
};
