import * as R from 'ramda';
import * as constants from './constants';

export const pagesCountSelector = R.path(constants.ROOT_PATH);

export const noResultsSelector = R.compose(R.equals(0), pagesCountSelector);
