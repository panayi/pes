import * as R from 'ramda';
import * as constants from './constants';

const hitsObjectsSelector = R.path(constants.ROOT_PATH);

export const hitsSelector = R.compose(R.values, hitsObjectsSelector);

export const isHitsEmptySelector = R.compose(R.isEmpty, hitsSelector);
