import { createAction } from 'redux-actions';
import zipArgs from '@pesposa/core/src/utils/zipArgs';
import * as types from './types';

export const setSelected = createAction(
  types.SET_SELECTED,
  zipArgs(['id', 'value']),
);

export const setQuery = createAction(types.SET_QUERY, zipArgs(['id', 'value']));
