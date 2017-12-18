import * as R from 'ramda';
import { createAction } from 'redux-actions';
import * as types from './types';
import * as constants from './constants';
import * as selectors from './selectors';
import registry from './registry';

const showModalAction = createAction(types.SHOW_MODAL, (id, props) =>
  R.merge(props, { id }),
);

const hideModalAction = createAction(types.HIDE_MODAL);

const willHideModal = createAction(types.WILL_HIDE_MODAL);

export const showModal = (id, components, modalProps) => dispatch => {
  registry[id] = components;
  dispatch(showModalAction(id, modalProps));
};

export const hideModal = id => (dispatch, getState) => {
  dispatch(willHideModal(id));
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Make sure it wasn't re-opened in the meantime
      if (selectors.willHideModalSelector(getState(), { id })) {
        dispatch(hideModalAction(id));
        resolve();
      }

      reject();
    }, constants.HIDE_MODAL_DELAY);
  });
};
