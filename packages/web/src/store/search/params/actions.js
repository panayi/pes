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

export const setUser = createAction(types.SET_USER);

export const setSold = createAction(types.SET_SOLD);

export const setIds = createAction(types.SET_IDS);
