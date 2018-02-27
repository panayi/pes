import { createAction } from 'redux-actions';
import zipArgs from '@pesposa/core/src/utils/zipArgs';
import * as types from './types';
import * as constants from './constants';

export const setLocation = createAction(
  types.SET_LOCATION,
  zipArgs([constants.ADDRESS_KEY, constants.GEOPOSITION_KEY]),
);
