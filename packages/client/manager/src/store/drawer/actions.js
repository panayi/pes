import { createAction } from 'redux-actions';
import * as types from './types';
import * as selectors from './selectors';

export const open = createAction(types.OPEN);

export const close = createAction(types.CLOSE);

export const toggle = () => (dispatch, getState) => {
  const isOpened = selectors.isOpenedSelector(getState());

  return isOpened ? dispatch(close()) : dispatch(open());
};
