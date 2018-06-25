import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { createSelector } from 'reselect';
import { selectors as siteSelectors } from '../site';
import * as paramsSelectors from './params/selectors';
import * as paramsConstants from './params/constants';
import * as pageSelectors from './page/selectors';
import * as pagesCountSelectors from './pagesCount/selectors';
import * as hitsSelectors from './hits/selectors';
import * as paidAdsSelectors from './paidAds/selectors';
import * as constants from './constants';

const facetFiltersSelector = createSelector(
  R.compose(
    R.when(
      R.isNil,
      R.always('-personals'), // Exclude `personals` ads from results
    ),
    paramsSelectors.categorySelector,
  ),
  R.compose(
    R.when(
      R.compose(
        R.equals('-'),
        R.head,
        R.defaultTo(''),
      ),
      R.concat('\\'),
    ),
    paramsSelectors.sellerSelector,
  ),
  paramsSelectors.soldSelector,
  siteSelectors.countryCodeSelector,
  R.compose(
    R.map(R.join(':')),
    R.toPairs,
    R.reject(isNilOrEmpty),
    R.zipObj(['category', 'seller', 'sold', 'location.address.country']),
    R.unapply(R.identity),
  ),
);

const filtersSelector = createSelector(
  paramsSelectors.minPriceSelector,
  paramsSelectors.maxPriceSelector,
  (priceMin, priceMax) => {
    const hasPriceMin = !isNilOrEmpty(priceMin);
    const hasPriceMax = !isNilOrEmpty(priceMax);

    if (hasPriceMin && hasPriceMax) {
      return `price>=${priceMin} AND price<=${priceMax}`;
    }

    if (hasPriceMin) {
      return `price>=${priceMin}`;
    }

    if (hasPriceMax) {
      return `price<=${priceMax}`;
    }

    return null;
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
  paramsSelectors.rawPropsSelector,
  (queryValue, facetFilters, filters, geoposition, ids, rawProps) => {
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
        ...rawProps,
      });
    }

    // Setting `ids` overrides everything else
    return {
      filters: R.compose(
        R.join(' OR '),
        R.map(id => `objectID:${id}`),
      )(ids),
    };
  },
);

export const hitsSelector = createSelector(
  hitsSelectors.hitsSelector,
  paidAdsSelectors.paidAdsSelector,
  (hits, paidAds) =>
    R.addIndex(R.reduce)(
      (acc, paidAd, index) => {
        const { ad, position } = paidAd;
        const finalAd = R.assoc('isPaidAd', true, ad);
        return R.insert(position + index, finalAd, acc);
      },
      hits,
      paidAds,
    ),
);

export const noMoreResultsSelector = createSelector(
  pageSelectors.pageSelector,
  pagesCountSelectors.pagesCountSelector,
  pagesCountSelectors.noResultsSelector,
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
