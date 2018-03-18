import * as R from 'ramda';
import * as algoliaConfig from '@pesposa/core/src/config/algolia';
import * as searchConstants from '../constants';

export const ROOT_KEY = 'params';

export const CATEGORY_KEY = 'category';
export const LOCATION_KEY = 'location';
export const LOCATION_ADDRESS_KEY = 'address';
export const LOCATION_GEOPOSITION_KEY = 'geoposition';
export const PRICE_KEY = 'price';
export const PRICE_MIN_KEY = 'min';
export const PRICE_MAX_KEY = 'max';
export const QUERY_KEY = 'query';
export const SORT_BY_KEY = 'sortBy';
export const USER_KEY = 'user';
export const SOLD_KEY = 'sold';
export const IDS_KEY = 'ids';

export const ROOT_PATH = [searchConstants.ROOT_KEY, ROOT_KEY];

export const SORT_BY_OPTIONS = algoliaConfig.ADS_INDEXES;
export const SORT_BY_OPTIONS_KEYS = R.keys(algoliaConfig.ADS_INDEXES);
export const SORT_BY_OPTIONS_WITHOUT_DEFAULT_KEYS = R.reject(
  R.equals('default'),
  SORT_BY_OPTIONS_KEYS,
);
