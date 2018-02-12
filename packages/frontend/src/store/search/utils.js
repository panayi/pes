import * as R from 'ramda';
import * as categoryTypes from './category/types';
import * as locationTypes from './location/types';
import * as priceTypes from './price/types';
import * as queryTypes from './query/types';
import * as sortByTypes from './sortBy/types';

const searchParamsActionTypes = R.compose(R.values, R.mergeAll)([
  categoryTypes,
  locationTypes,
  priceTypes,
  queryTypes,
  sortByTypes,
]);

export const isSearchParamsAction = R.contains(R.__, searchParamsActionTypes);

export const getWrappedState = (getState, searchId) =>
  R.prop(searchId, getState());
