import { createAction } from 'redux-actions';
import * as types from './types';

export const createAdPending = createAction(types.AD_CREATE_PENDING);
export const createAdFailed = createAction(types.AD_CREATE_FAILED);
export const createAdCompleted = createAction(types.AD_CREATE_COMPLETED);
export const createAdReset = createAction(types.AD_CREATE_RESET);
