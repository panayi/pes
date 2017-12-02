/* @flow */
import * as R from 'ramda';
import { createSelector } from 'reselect';
import propsSelector from 'utils/propsSelector';
import { PENDING_ADS } from 'services/connectData/types';
import { uidSelector } from '../auth/selectors';

// adImagesPathSelector :: (_, Props) -> Object | Nil
export const adImagesPathSelector = createSelector(
  R.compose(R.prop('adId'), propsSelector),
  adId => `ads/${adId}/images`,
);

// pendingAdImagesSelector :: State -> Object | Nil
export const pendingAdImagesPathSelector = createSelector(
  uidSelector,
  R.unless(R.isNil, uid => `${PENDING_ADS}/${uid}/images`),
);

// pendingAdSelector :: (_, Props) -> Ad | Nil
//   Ad = Object
export const pendingAdSelector = createSelector(
  propsSelector,
  R.prop('pendingAd'),
);
