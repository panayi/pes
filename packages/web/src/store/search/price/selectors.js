import * as R from 'ramda';
import * as constants from './constants';

export const priceSelector = R.path(constants.ROOT_PATH);

export const minPriceSelector = R.compose(R.prop('min'), priceSelector);

export const maxPriceSelector = R.compose(R.prop('max'), priceSelector);
