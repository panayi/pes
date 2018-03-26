import * as R from 'ramda';
import { createSelector } from 'reselect';
import round from '@pesposa/core/src/utils/round';
import { selectors as userInfoSelectors } from 'store/userInfo';
import * as constants from './constants';
import { initialState } from './reducer';

// Params
export const paramsSelector = R.path(constants.ROOT_PATH);

// Category
export const categorySelector = R.compose(
  R.prop(constants.CATEGORY_KEY),
  paramsSelector,
);

export const categoryHasValueSelector = R.compose(
  R.complement(R.equals(initialState[constants.CATEGORY_KEY])),
  categorySelector,
);

// Location
export const locationSelector = R.compose(
  R.prop(constants.LOCATION_KEY),
  paramsSelector,
);

export const locationHasValueSelector = R.compose(
  R.complement(R.equals(initialState[constants.LOCATION_KEY])),
  locationSelector,
);

export const selectedAddressSelector = R.compose(
  R.prop(constants.LOCATION_ADDRESS_KEY),
  locationSelector,
);

export const addressSelector = createSelector(
  selectedAddressSelector,
  userInfoSelectors.addressStringSelector,
  R.or,
);

const selectedGeopositionSelector = R.compose(
  R.prop(constants.LOCATION_GEOPOSITION_KEY),
  locationSelector,
);

export const geopositionSelector = createSelector(
  selectedGeopositionSelector,
  userInfoSelectors.geopositionSelector,
  R.compose(R.map(round), R.or),
);

// Price
export const priceSelector = R.compose(
  R.prop(constants.PRICE_KEY),
  paramsSelector,
);

export const priceHasValueSelector = R.compose(
  R.complement(R.equals(initialState[constants.PRICE_KEY])),
  priceSelector,
);

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

export const queryHasValueSelector = R.compose(
  R.complement(R.equals(initialState[constants.QUERY_KEY])),
  querySelector,
);

// SortBy
export const sortBySelector = R.compose(
  R.prop(constants.SORT_BY_KEY),
  paramsSelector,
);

export const sortByHasValueSelector = R.compose(
  R.complement(R.equals(initialState[constants.SORT_BY_KEY])),
  sortBySelector,
);

// User
export const userSelector = R.compose(
  R.prop(constants.USER_KEY),
  paramsSelector,
);

export const userHasValueSelector = R.compose(
  R.complement(R.equals(initialState[constants.USER_KEY])),
  userSelector,
);

// Sold
export const soldSelector = R.compose(
  R.prop(constants.SOLD_KEY),
  paramsSelector,
);

export const soldHasValueSelector = R.compose(
  R.complement(R.equals(initialState[constants.SOLD_KEY])),
  soldSelector,
);

// Ids
export const idsSelector = R.compose(R.prop(constants.IDS_KEY), paramsSelector);
