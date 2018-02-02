import { createAction } from 'redux-actions';
import { zipArgs } from 'pesposa-utils';
import * as types from './types';
import * as constants from './constants';

export const setSelectedCategory = createAction(types.SET_SELECTED_CATEGORY);

export const setSortBy = createAction(types.SET_SORT_BY);

export const setLocation = createAction(
  types.SET_LOCATION,
  zipArgs([constants.ADDRESS_KEY, constants.GEOPOSITION_KEY]),
);
