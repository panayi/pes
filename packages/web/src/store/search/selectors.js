import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { createSelector } from 'reselect';
import propSelector from '@pesposa/core/src/utils/propSelector';
import * as paramsSelectors from './params/selectors';
import * as paramsConstants from './params/constants';
import * as pageSelectors from './page/selectors';
import * as totalHitsSelectors from './totalHits/selectors';
import * as constants from './constants';

const facetFiltersSelector = createSelector(
  R.compose(
    R.when(
      R.isNil,
      R.always('-personals'), // Exclude `personals` ads from results
    ),
    paramsSelectors.categorySelector,
  ),
  paramsSelectors.userSelector,
  paramsSelectors.soldSelector,
  R.compose(
    R.map(R.join(':')),
    R.toPairs,
    R.reject(isNilOrEmpty),
    R.zipObj(['category', 'user', 'sold']),
    R.unapply(R.identity),
  ),
);

const filtersSelector = createSelector(
  paramsSelectors.minPriceSelector,
  paramsSelectors.maxPriceSelector,
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
  paramsSelectors.sortBySelector,
  paramsSelectors.querySelector,
  (sortBy, queryValue) => {
    if (!isNilOrEmpty(sortBy)) {
      return paramsConstants.SORT_BY_OPTIONS[sortBy];
    }

    if (!isNilOrEmpty(queryValue)) {
      return paramsConstants.SORT_BY_OPTIONS.default;
    }

    return paramsConstants.SORT_BY_OPTIONS.byDateDesc;
  },
);

export const searchParamsSelector = createSelector(
  paramsSelectors.querySelector,
  facetFiltersSelector,
  filtersSelector,
  paramsSelectors.geopositionSelector,
  paramsSelectors.idsSelector,
  (queryValue, facetFilters, filters, geoposition, ids) => {
    if (isNilOrEmpty(ids)) {
      return R.reject(isNilOrEmpty, {
        query: queryValue,
        facetFilters,
        filters,
        hitsPerPage: constants.HITS_PER_PAGE,
        aroundLatLng: geoposition
          ? `${geoposition.latitude}, ${geoposition.longitude}`
          : null,
        getRankingInfo: true,
      });
    }

    // Setting `ids` overrides everything else
    return {
      // Prefix with '\', since firebase IDs can start with '-'. See why: https://goo.gl/nqPUrG
      facetFilters: R.map(id => `objectID:\\${id}`, ids),
    };
  },
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
