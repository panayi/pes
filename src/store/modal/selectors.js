import * as R from 'ramda';
import { isNotNil } from 'ramda-adjunct';
import { createSelector } from 'reselect';
import modalsRegistry from './modalsRegistry';

const modalPath = ['modal'];

const modalSelector = R.path(modalPath);

const modalIdSelector = createSelector(
  modalSelector,
  R.prop('id'),
);

export const modalComponentSelector = createSelector(
  modalIdSelector,
  R.prop(R.__, modalsRegistry),
);

export const modalPropsSelector = createSelector(
  modalSelector,
  R.omit(['id']),
);

const willHideModalSelector = createSelector(
  modalSelector,
  R.prop('willHide'),
);

export const isOpenSelector = createSelector(
  modalComponentSelector,
  willHideModalSelector,
  (modalComponent, willHide) => isNotNil(modalComponent) && !willHide,
);
