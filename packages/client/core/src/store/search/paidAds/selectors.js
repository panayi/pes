import * as R from 'ramda';
import { createSelector } from 'reselect';
import paidAds from '@pesposa/core/src/config/paidAds';
import { categorySelector } from '../params/selectors';
import * as constants from './constants';

export const paidAdsCollectionSelector = createSelector(
  categorySelector,
  R.compose(
    R.defaultTo([]),
    R.prop(R.__, paidAds),
  ),
);

export const paidAdsSelector = R.path(constants.ROOT_PATH);
