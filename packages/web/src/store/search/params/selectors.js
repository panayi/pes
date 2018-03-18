import * as R from 'ramda';
import { createSelector } from 'reselect';
import { selectors as locationSelectors } from 'store/firebase/profile/location';
import * as constants from './constants';

// Params
export const paramsSelector = R.path(constants.ROOT_PATH);

// Category
export const categorySelector = R.compose(
  R.prop(constants.CATEGORY_KEY),
  paramsSelector,
);

// Location
export const locationSelector = R.compose(
  R.prop(constants.LOCATION_KEY),
  paramsSelector,
);

export const selectedAddressSelector = R.compose(
  R.prop(constants.LOCATION_ADDRESS_KEY),
  locationSelector,
);

export const addressSelector = createSelector(
  selectedAddressSelector,
  locationSelectors.addressStringSelector,
  R.or,
);

const selectedGeopositionSelector = R.compose(
  R.prop(constants.LOCATION_GEOPOSITION_KEY),
  locationSelector,
);

export const geopositionSelector = createSelector(
  selectedGeopositionSelector,
  locationSelectors.geopositionSelector,
  R.or,
);

// Price
const priceSelector = R.compose(R.prop(constants.PRICE_KEY), paramsSelector);
export const minPriceSelector = R.compose(
  R.prop(constants.PRICE_MIN_KEY),
  priceSelector,
);
export const maxPriceSelector = R.compose(
  R.prop(constants.PRICE_MAX_KEY),
  priceSelector,
);

// Query
export const querySelector = R.compose(
  R.prop(constants.QUERY_KEY),
  paramsSelector,
);

// SortBy
export const sortBySelector = R.compose(
  R.prop(constants.SORT_BY_KEY),
  paramsSelector,
);

// User
export const userSelector = R.compose(
  R.prop(constants.USER_KEY),
  paramsSelector,
);

// Sold
export const soldSelector = R.compose(
  R.prop(constants.SOLD_KEY),
  paramsSelector,
);

// Ids
export const idsSelector = R.compose(R.prop(constants.IDS_KEY), paramsSelector);
