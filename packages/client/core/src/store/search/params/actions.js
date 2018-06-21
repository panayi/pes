import { createAction } from 'redux-actions';
import zipArgs from '@pesposa/core/src/utils/zipArgs';
import * as types from './types';
import * as constants from './constants';

export const setParamsFromProps = createAction(types.SET_PARAMS_FROM_PROPS);

export const setCategory = createAction(types.SET_CATEGORY);
export const setLocation = createAction(
  types.SET_LOCATION,
  zipArgs([constants.LOCATION_ADDRESS_KEY, constants.LOCATION_GEOPOSITION_KEY]),
);
export const setPrice = createAction(types.SET_PRICE);
export const setQuery = createAction(types.SET_QUERY);
export const setSortBy = createAction(types.SET_SORT_BY);
export const setSeller = createAction(types.SET_SELLER);
export const setSold = createAction(types.SET_SOLD);
export const setIds = createAction(types.SET_IDS);

export const resetCategory = createAction(types.RESET_CATEGORY);
export const resetLocation = createAction(
  types.RESET_LOCATION,
  zipArgs([constants.LOCATION_ADDRESS_KEY, constants.LOCATION_GEOPOSITION_KEY]),
);
export const resetPrice = createAction(types.RESET_PRICE);
export const resetQuery = createAction(types.RESET_QUERY);
export const resetSortBy = createAction(types.RESET_SORT_BY);
export const resetSeller = createAction(types.RESET_SELLER);
export const resetSold = createAction(types.RESET_SOLD);
export const resetIds = createAction(types.RESET_IDS);
