import { createAction } from 'redux-actions';
import * as types from './types';

export const setSelectedCategory = createAction(types.SET_SELECTED_CATEGORY);

export const setSortBy = createAction(types.SET_SORT_BY);
