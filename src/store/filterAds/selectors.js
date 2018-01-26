import * as R from 'ramda';
import { createSelector } from 'reselect';
import { isNilOrEmpty } from 'ramda-adjunct';
import { selectors as locationSelectors } from '../firebase/profile/location';
import * as constants from './constants';

const selectedCategorySelector = R.path(constants.SELECTED_CATEGORY_PATH);

export const sortBySelector = R.path(constants.SORT_BY_PATH);

const locationSelector = R.path(constants.LOCATION_PATH);

const selectedGeopositionSelector = R.compose(
  R.prop(constants.GEOPOSITION_KEY),
  locationSelector,
);

const geopositionSelector = createSelector(
  selectedGeopositionSelector,
  locationSelectors.geopositionSelector,
  R.or,
);

export const selectedAddressSelector = R.compose(
  R.prop(constants.ADDRESS_KEY),
  locationSelector,
);

export const addressSelector = createSelector(
  selectedAddressSelector,
  locationSelectors.addressStringSelector,
  R.or,
);

const queryValueSelector = R.path([...constants.QUERY_PATH, 'value']);

const priceSelector = R.path(constants.PRICE_PATH);

const minPriceSelector = R.compose(R.prop('min'), priceSelector);

const maxPriceSelector = R.compose(R.prop('max'), priceSelector);

const facetFiltersSelector = createSelector(
  selectedCategorySelector,
  selectedCategory =>
    isNilOrEmpty(selectedCategory) ? [] : [`category:${selectedCategory}`],
);

const filtersSelector = createSelector(
  minPriceSelector,
  maxPriceSelector,
  (priceMin, priceMax) => {
    const hasPriceMin = !isNilOrEmpty(priceMin);
    const hasPriceMax = !isNilOrEmpty(priceMax);
    if (!hasPriceMin && !hasPriceMax) {
      return null;
    }

    const finalPriceMin = hasPriceMin ? priceMin : 0;
    const finalPriceMax = hasPriceMax ? priceMax : Number.MAX_SAFE_INTEGER;

    return `price:${finalPriceMin} TO ${finalPriceMax}`;
  },
);

const indexSelector = createSelector(
  sortBySelector,
  queryValueSelector,
  (sortBy, queryValue) => {
    if (!isNilOrEmpty(sortBy)) {
      return constants.SORT_BY_OPTIONS[sortBy];
    }

    if (!isNilOrEmpty(queryValue)) {
      return constants.SORT_BY_OPTIONS.default;
    }

    return constants.SORT_BY_OPTIONS.byDateDesc;
  },
);

export const searchParamsSelector = createSelector(
  queryValueSelector,
  facetFiltersSelector,
  filtersSelector,
  indexSelector,
  geopositionSelector,
  (queryValue, facetFilters, filters, index, geoposition) =>
    R.filter(R.compose(R.not, isNilOrEmpty), {
      index,
      query: queryValue,
      facetFilters,
      filters,
      hitsPerPage: constants.HITS_PER_PAGE,
      aroundLatLng:
        geoposition && `${geoposition.latitude}, ${geoposition.longitude}`,
      getRankingInfo: true,
    }),
);
