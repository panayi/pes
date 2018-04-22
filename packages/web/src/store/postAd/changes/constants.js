import * as postAdConstants from '../constants';

export const ROOT_KEY = 'changes';
export const CREATED_ADS_KEY = 'createdAds';
export const DELETED_ADS_KEY = 'deletedAds';

export const ROOT_PATH = [postAdConstants.ROOT_KEY, ROOT_KEY];
export const CREATED_ADS_PATH = [...ROOT_PATH, CREATED_ADS_KEY];
export const DELETED_ADS_PATH = [...ROOT_PATH, DELETED_ADS_KEY];
