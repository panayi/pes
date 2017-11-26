import * as R from 'ramda';
import { createAction } from 'redux-actions';
import * as types from './types';
import modalsRegistry from './modalsRegistry';

const showModalAction = createAction(
  types.SHOW_MODAL,
  (id, props) => R.merge(props, { id }),
);

const hideModalAction = createAction(types.HIDE_MODAL);

const willHideModal = createAction(types.WILL_HIDE_MODAL);

export const showModal = (component, props) => (dispatch) => {
  const id = component.displayName;
  modalsRegistry[id] = component;
  dispatch(showModalAction(id, props));
};

export const hideModal = () => (dispatch) => {
  dispatch(willHideModal());
  setTimeout(() => dispatch(hideModalAction()), 1000);
};
