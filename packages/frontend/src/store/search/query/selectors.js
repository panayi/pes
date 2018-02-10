import * as R from 'ramda';
import * as constants from './constants';

export const querySelector = R.path([...constants.ROOT_PATH, 'value']);
