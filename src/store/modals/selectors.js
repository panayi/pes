import * as R from 'ramda';
import { isNotNil } from 'ramda-adjunct';
import { createSelector } from 'reselect';
import propsSelector from 'utils/propsSelector';
import registry from './registry';

const modalsPath = ['modals'];

export const modalsSelector = R.path(modalsPath);

const modalSelector = createSelector(
  R.compose(R.prop('id'), propsSelector),
  modalsSelector,
  R.prop,
);

export const modalContentSelector = (state, { id }) =>
  R.path([id, 'content'], registry);
export const modalActionsSelector = (state, { id }) =>
  R.path([id, 'actions'], registry);

export const modalPropsSelector = createSelector(modalSelector, R.omit(['id']));

export const willHideModalSelector = createSelector(
  modalSelector,
  R.prop('willHide'),
);

export const isOpenSelector = createSelector(
  modalContentSelector,
  willHideModalSelector,
  (modalContent, willHide) => isNotNil(modalContent) && !willHide,
);
