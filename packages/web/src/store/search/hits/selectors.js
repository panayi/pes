import * as R from 'ramda';
import { createSelector } from 'reselect';
import propSelector from '@pesposa/core/src/utils/propSelector';
import * as algoliaConfig from '@pesposa/core/src/config/algolia';
import { selectors as changesSelectors } from 'store/postAd/changes';
import * as constants from './constants';

const algoliaHitsSelector = R.path(constants.ROOT_PATH);

export const hitsSelector = createSelector(
  algoliaHitsSelector,
  changesSelectors.deletedAdsSelector,
  (hits, deletedAds) =>
    R.reject(hit => R.contains(hit.objectID, deletedAds), hits),
);

export const isHitsEmptySelector = R.compose(R.isEmpty, hitsSelector);

export const hitsCountSelector = R.compose(R.length, hitsSelector);

const hitIdsSelectors = R.compose(R.pluck(algoliaConfig.ID), hitsSelector);

export const hitIndexSelector = R.useWith(R.flip(R.findIndex), [
  hitIdsSelectors,
  R.compose(R.equals, propSelector('id')),
]);

export const previousHitSelector = R.converge(
  (index, hits) => (index < 0 ? null : R.nth(index, hits)),
  [R.compose(R.dec, hitIndexSelector), hitsSelector],
);

export const nextHitSelector = R.converge(R.nth, [
  R.compose(R.inc, hitIndexSelector),
  hitsSelector,
]);
