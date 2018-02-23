import * as R from 'ramda';
import { isNotNil } from 'ramda-adjunct';
import { createSelector } from 'reselect';
import { propSelector } from 'pesposa-utils';
import * as constants from './constants';

export const modalsSelector = R.path(constants.ROOT_PATH);

const modalSelector = createSelector(
  propSelector('id'),
  modalsSelector,
  R.prop,
);

export const modalPropsSelector = createSelector(modalSelector, R.omit(['id']));

export const willHideModalSelector = createSelector(
  modalSelector,
  R.prop('willHide'),
);

export const isOpenSelector = createSelector(
  modalSelector,
  willHideModalSelector,
  (modal, willHide) => isNotNil(modal) && !willHide,
);
