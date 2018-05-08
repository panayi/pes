import * as R from 'ramda';
import * as constants from './constants';

export const pageSelector = R.pathOr(0, constants.ROOT_PATH);
