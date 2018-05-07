import * as R from 'ramda';
import { createSelector } from 'reselect';
import propSelector from '@pesposa/core/src/utils/propSelector';
import * as constants from './constants';

const allOpenSelector = R.path(constants.OPEN_PATH);
const allModalPropsSelector = R.path(constants.MODAL_PROPS_PATH);
const allContentPropsSelector = R.path(constants.CONTENT_PROPS_PATH);

export const openSelector = createSelector(
  propSelector('id'),
  allOpenSelector,
  R.propOr(false),
);

export const anyOpenSelector = createSelector(
  allOpenSelector,
  R.compose(R.any(R.identity), R.values),
);

export const modalPropsSelector = createSelector(
  propSelector('id'),
  allModalPropsSelector,
  R.prop,
);

export const contentPropsSelector = createSelector(
  propSelector('id'),
  allContentPropsSelector,
  R.prop,
);
