import * as R from 'ramda';
import { createSelector } from 'reselect';
import { selectors as locationSelectors } from 'store/firebase/profile/location';
import * as constants from './constants';

export const locationSelector = R.path(constants.ROOT_PATH);

const selectedGeopositionSelector = R.compose(
  R.prop(constants.GEOPOSITION_KEY),
  locationSelector,
);

export const geopositionSelector = createSelector(
  selectedGeopositionSelector,
  locationSelectors.geopositionSelector,
  R.or,
);

export const selectedAddressSelector = R.compose(
  R.prop(constants.ADDRESS_KEY),
  locationSelector,
);

export const addressSelector = createSelector(
  selectedAddressSelector,
  locationSelectors.addressStringSelector,
  R.or,
);
