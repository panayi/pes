import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { createSelector } from 'reselect';
import round from '@pesposa/core/src/utils/round';
import { models } from '../../firebase/data';
import { selectors as userInfoSelectors } from '../../userInfo';
import * as constants from './constants';
import { initialState } from './reducer';

// Params
export const paramsSelector = R.path(constants.ROOT_PATH);

// Category
export const categorySelector = R.compose(
  R.prop(constants.CATEGORY_KEY),
  paramsSelector,
);

export const categoryObjectSelector = (categoryIdSelector = categorySelector) =>
  createSelector(
    categoryIdSelector,
    R.compose(
      R.defaultTo([]),
      models.categories.all.selector,
    ),
    (categoryId, categories) => R.find(R.propEq('id', categoryId), categories),
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
  userInfoSelectors.addressStringForSiteSelector,
  R.or,
);

const selectedGeopositionSelector = R.compose(
  R.prop(constants.LOCATION_GEOPOSITION_KEY),
  locationSelector,
);

export const geopositionSelector = createSelector(
  selectedGeopositionSelector,
  userInfoSelectors.geopositionForSiteSelector,
  R.compose(
    R.unless(isNilOrEmpty, R.map(round)),
    R.or,
  ),
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

// Seller
export const sellerSelector = R.compose(
  R.prop(constants.SELLER_KEY),
  paramsSelector,
);

export const sellerHasValueSelector = R.compose(
  R.complement(R.equals(initialState[constants.SELLER_KEY])),
  sellerSelector,
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
export const idsSelector = R.compose(
  R.prop(constants.IDS_KEY),
  paramsSelector,
);

// Raw props
export const rawPropsSelector = R.compose(
  R.propOr({}, constants.RAW_PROPS_KEY),
  paramsSelector,
);
