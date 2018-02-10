import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { createSelector } from 'reselect';
import * as categorySelectors from './category/selectors';
import * as locationSelectors from './location/selectors';
import * as priceSelectors from './price/selectors';
import * as querySelectors from './query/selectors';
import * as sortBySelectors from './sortBy/selectors';
import * as sortByConstants from './sortBy/constants';
import * as constants from './constants';

const facetFiltersSelector = createSelector(
  categorySelectors.categorySelector,
  selectedCategory =>
    isNilOrEmpty(selectedCategory) ? null : `category:${selectedCategory}`,
);

const filtersSelector = createSelector(
  priceSelectors.minPriceSelector,
  priceSelectors.maxPriceSelector,
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
  sortBySelectors.sortBySelector,
  querySelectors.querySelector,
  (sortBy, queryValue) => {
    if (!isNilOrEmpty(sortBy)) {
      return sortByConstants.SORT_BY_OPTIONS[sortBy];
    }

    if (!isNilOrEmpty(queryValue)) {
      return sortByConstants.SORT_BY_OPTIONS.default;
    }

    return sortByConstants.SORT_BY_OPTIONS.byDateDesc;
  },
);

export const searchParamsSelector = createSelector(
  querySelectors.querySelector,
  facetFiltersSelector,
  filtersSelector,
  indexSelector,
  locationSelectors.geopositionSelector,
  (queryValue, facetFilters, filters, index, geoposition) =>
    R.reject(isNilOrEmpty, {
      index,
      query: queryValue,
      facetFilters,
      filters,
      hitsPerPage: constants.HITS_PER_PAGE,
      aroundLatLng:
        index === sortByConstants.SORT_BY_OPTIONS.byDateDesc
          ? undefined
          : geoposition && `${geoposition.latitude}, ${geoposition.longitude}`,
      aroundLatLngViaIP:
        index === sortByConstants.SORT_BY_OPTIONS.byDateDesc ? true : undefined,
      getRankingInfo: true,
    }),
);
