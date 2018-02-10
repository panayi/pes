import { createAction } from 'redux-actions';
import * as types from './types';

export const nextPage = createAction(types.NEXT_PAGE);

export const resetPage = createAction(types.RESET_PAGE);
