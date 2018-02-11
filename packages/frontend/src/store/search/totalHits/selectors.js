import * as R from 'ramda';
import { createSelector } from 'reselect';
import * as searchConstants from '../constants';
import * as constants from './constants';

export const totalHitsSelector = R.path(constants.ROOT_PATH);

export const pagesCountSelector = createSelector(
  totalHitsSelector,
  R.divide(R.__, searchConstants.HITS_PER_PAGE),
);

export const noResultsSelector = R.compose(R.equals(0), totalHitsSelector);
