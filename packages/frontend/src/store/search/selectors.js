import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { createSelector } from 'reselect';
import { propSelector } from 'pesposa-utils';
import * as rawParamsSelectors from './rawParams/selectors';
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
  category => (isNilOrEmpty(category) ? [] : [`category:${category}`]),
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
  rawParamsSelectors.rawParamsSelector,
  querySelectors.querySelector,
  facetFiltersSelector,
  filtersSelector,
  indexNameSelector,
  locationSelectors.geopositionSelector,
  (rawParams, queryValue, facetFilters, filters, indexName, geoposition) =>
    R.reject(isNilOrEmpty, {
      query: queryValue,
      facetFilters: R.concat(rawParams.facetFilters || [], facetFilters),
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
  totalHitsSelectors.noResultsSelector,
  (currentPage, availablePages, noResults) => {
    if (noResults) {
      return false;
    }

    if (R.isNil(currentPage) || R.isNil(availablePages)) {
      return false;
    }

    // `page` starts from 0.
    // Hence, to get total fetched pages, add 1.
    return currentPage + 1 >= availablePages;
  },
);

export const isHomeSearchSelector = R.compose(
  R.equals(constants.HOME_SEARCH_ID),
  propSelector(constants.CONTEXT_SEARCH_ID_KEY),
);

export const isProfileSearchSelector = R.compose(
  R.equals(constants.PROFILE_SEARCH_ID),
  propSelector(constants.CONTEXT_SEARCH_ID_KEY),
);
