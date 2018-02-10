import * as R from 'ramda';
import { algolia as algoliaConfig } from 'pesposa-config';
import * as searchConstants from '../constants';

export const ROOT_KEY = 'sortBy';

export const ROOT_PATH = [searchConstants.ROOT_KEY, ROOT_KEY];

export const SORT_BY_OPTIONS = algoliaConfig.ADS_INDEXES;
export const SORT_BY_OPTIONS_KEYS = R.keys(algoliaConfig.ADS_INDEXES);
export const SORT_BY_OPTIONS_WITHOUT_DEFAULT_KEYS = R.reject(
  R.equals('default'),
  SORT_BY_OPTIONS_KEYS,
);
