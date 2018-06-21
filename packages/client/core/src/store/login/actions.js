import { createAction } from 'redux-actions';
import * as types from './types';

export const loginStarted = createAction(types.LOGIN_STARTED);
export const loginSucceeded = createAction(types.LOGIN_SUCCEEDED);
export const loginFailed = createAction(types.LOGIN_FAILED);
export const loginReset = createAction(types.LOGIN_RESET);
