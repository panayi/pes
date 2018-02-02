import * as R from 'ramda';
import { isNotNil } from 'ramda-adjunct';
import { createSelector } from 'reselect';
import { propsSelector } from 'pesposa-utils';
import registry from './registry';

const modalsPath = ['modals'];

export const modalsSelector = R.path(modalsPath);

const modalIdsSelector = createSelector(modalsSelector, R.keys);

const modalSelector = createSelector(
  R.compose(R.prop('id'), propsSelector),
  modalsSelector,
  R.prop,
);

const createComponentSelector = key => (_, { id }) =>
  R.path([id, key], registry);

export const componentForContentSelector = createComponentSelector('content');

export const componentForActionsSelector = createComponentSelector('actions');

const componentForModalSelector = createComponentSelector('modal');

export const modalComponentsSelector = createSelector(
  modalIdsSelector,
  R.map(id => [id, componentForModalSelector(null, { id })]),
);

export const modalPropsSelector = createSelector(modalSelector, R.omit(['id']));

export const willHideModalSelector = createSelector(
  modalSelector,
  R.prop('willHide'),
);

export const isOpenSelector = createSelector(
  componentForContentSelector,
  willHideModalSelector,
  (modalContent, willHide) => isNotNil(modalContent) && !willHide,
);
