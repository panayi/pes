import * as R from 'ramda';
import * as constants from './constants';

export const createdAdsSelector = R.path(constants.CREATED_ADS_PATH);

export const deletedAdsSelector = R.path(constants.DELETED_ADS_PATH);
