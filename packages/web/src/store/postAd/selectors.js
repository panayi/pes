/* @flow */
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { createSelector } from 'reselect';
import * as modelPaths from '@pesposa/core/src/config/modelPaths';
import propSelector from '@pesposa/core/src/utils/propSelector';
import { selectors as authSelectors } from 'store/firebase/auth';
import { selectors as userInfoSelectors } from 'store/userInfo';
import * as constants from './constants';

export const createAdPath = ['postAd', 'create'];

export const createAdSelector = R.path(createAdPath);

export const isCreateAdIdleSelector = createSelector(
  createAdSelector,
  R.equals(constants.AD_CREATE_IDLE_STATE),
);

export const isCreateAdPendingSelector = createSelector(
  createAdSelector,
  R.equals(constants.AD_CREATE_PENDING_STATE),
);

export const isCreateAdCompletedSelector = createSelector(
  createAdSelector,
  R.equals(constants.AD_CREATE_COMPLETED_STATE),
);

// adImagesPathSelector :: Props -> Object | Nil
export const adImagesPathSelector = createSelector(
  propSelector('adId'),
  adId => modelPaths.AD_IMAGES(adId).string,
);

// draftAdImagesPathSelector :: State -> Object | Nil
export const draftAdImagesPathSelector = createSelector(
  authSelectors.uidSelector,
  R.unless(R.isNil, uid => `${modelPaths.DRAFT_AD(uid).string}/images`),
);

export const newAdLocationSelector = createSelector(
  userInfoSelectors.locationForSiteSelector,
  location => {
    const countryCode = R.path(['address', 'country', 'cca2'], location);
    return isNilOrEmpty(countryCode)
      ? location
      : R.assocPath(['address', 'country'], countryCode, location);
  },
);
