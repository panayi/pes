import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { createSelector } from 'reselect';
import * as categorySelectors from './category/selectors';
import * as locationSelectors from './location/selectors';
import * as priceSelectors from './price/selectors';
import * as querySelectors from './query/selectors';
import * as pageSelectors from './page/selectors';
import * as sortBySelectors from './sortBy/selectors';
import * as totalHitsSelectors from './totalHits/selectors';
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

export const indexNameSelector = createSelector(
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
  indexNameSelector,
  locationSelectors.geopositionSelector,
  (queryValue, facetFilters, filters, indexName, geoposition) =>
    R.reject(isNilOrEmpty, {
      query: queryValue,
      facetFilters,
      filters,
      hitsPerPage: constants.HITS_PER_PAGE,
      aroundLatLng:
        indexName === sortByConstants.SORT_BY_OPTIONS.byDateDesc
          ? undefined
          : geoposition && `${geoposition.latitude}, ${geoposition.longitude}`,
      aroundLatLngViaIP:
        indexName === sortByConstants.SORT_BY_OPTIONS.byDateDesc
          ? true
          : undefined,
      getRankingInfo: true,
    }),
);

export const noMoreResultsSelector = createSelector(
  pageSelectors.pageSelector,
  totalHitsSelectors.pagesCountSelector,
  (currentPage, availablePages) => {
    if (R.isNil(currentPage) || R.isNil(availablePages)) {
      return false;
    }

    // `page` starts from 0.
    // Hence, to get total fetched pages, add 1.
    return currentPage + 1 >= availablePages;
  },
);
