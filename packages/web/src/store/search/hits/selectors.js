import * as R from 'ramda';
import { propSelector } from 'pesposa-utils';
import { algolia as algoliaConfig } from 'pesposa-config';
import * as constants from './constants';

export const hitsSelector = R.path(constants.ROOT_PATH);

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
