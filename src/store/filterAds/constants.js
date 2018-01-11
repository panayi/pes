import * as R from 'ramda';
import { ADS_INDEXES } from 'config/algolia';

export const ROOT_KEY = 'filterAds';
export const SELECTED_CATEGORY_KEY = 'selectedCategory';
export const SORT_BY_KEY = 'sortBy';
export const QUERY_KEY = 'query';
export const PRICE_KEY = 'price';

export const SELECTED_CATEGORY_PATH = [ROOT_KEY, SELECTED_CATEGORY_KEY];
export const SORT_BY_PATH = [ROOT_KEY, SORT_BY_KEY];
export const QUERY_PATH = [ROOT_KEY, QUERY_KEY];
export const PRICE_PATH = [ROOT_KEY, PRICE_KEY];

export const QUERY_MODEL_PATH = `${ROOT_KEY}.${QUERY_KEY}`;
export const PRICE_MODEL_PATH = `${ROOT_KEY}.${PRICE_KEY}`;

export const HITS_PER_PAGE = 20;

export const SORT_BY_OPTIONS = ADS_INDEXES;
export const SORT_BY_OPTIONS_KEYS = R.keys(ADS_INDEXES);
