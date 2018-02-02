import * as R from 'ramda';
import { createSelector } from 'reselect';
import { propSelector } from 'pesposa-core/utils';
import * as constants from './constants';

const locationSelector = R.path(constants.LOCATION_PATH);

const pathnameSelector = R.compose(R.prop('pathname'), locationSelector);

export const inProfilePageSelector = createSelector(
  pathnameSelector,
  R.test(/^\/profile/),
);

export const inUserPageSelector = createSelector(
  pathnameSelector,
  R.test(/^\/user/),
);

export const inProfileOrUserPageSelector = createSelector(
  inProfilePageSelector,
  inUserPageSelector,
  R.or,
);

export const routeParamsSelector = propSelector(['match', 'params']);

export const routeParamSelector = key =>
  R.compose(R.prop(key), R.defaultTo({}), routeParamsSelector);
