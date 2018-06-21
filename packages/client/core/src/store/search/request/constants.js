import * as searchConstants from '../constants';

export const ROOT_KEY = 'request';
export const STATUS_KEY = 'status';
export const ERROR_KEY = 'error';

export const ROOT_PATH = [searchConstants.ROOT_KEY, ROOT_KEY];
export const STATUS_PATH = [...ROOT_PATH, STATUS_KEY];
export const ERROR_PATH = [...ROOT_PATH, ERROR_KEY];

export const STATUS_PENDING = 'pending';
export const STATUS_SUCCESS = 'success';
export const STATUS_FAIL = 'fail';
