import * as postAdConstants from '../constants';

export const ROOT_KEY = 'createAd';
export const CREATE_AD_STATUS_KEY = 'status';
export const CREATE_AD_ERROR_KEY = 'error';

export const ROOT_PATH = [postAdConstants.ROOT_KEY, ROOT_KEY];
export const CREATE_AD_STATUS_PATH = [...ROOT_PATH, CREATE_AD_STATUS_KEY];
export const CREATE_AD_ERROR_PATH = [...ROOT_PATH, CREATE_AD_ERROR_KEY];

export const AD_CREATE_IDLE_STATE = null;
export const AD_CREATE_PENDING_STATE = 'pending';
export const AD_CREATE_FAILED_STATE = 'failed';
export const AD_CREATE_COMPLETED_STATE = 'completed';
