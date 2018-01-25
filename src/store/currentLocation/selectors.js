import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { createSelector } from 'reselect';
import { selectors as profileSelectors } from 'store/profile';

const locationSelector = profileSelectors.profilePropSelector(['location'], {
  populated: true,
});

export const geopositionSelector = createSelector(
  locationSelector,
  R.prop('geoposition'),
);

const addressSelector = createSelector(locationSelector, R.prop('address'));

export const countrySelector = createSelector(
  addressSelector,
  R.prop('country'),
);

export const countryCodeSelector = createSelector(
  countrySelector,
  R.prop('code'),
);

export const countryNameSelector = createSelector(
  countrySelector,
  R.prop('name'),
);

const citySelector = createSelector(addressSelector, R.prop('city'));

export const addressStringSelector = createSelector(
  countryNameSelector,
  citySelector,
  (countryName, city) => {
    const noCity = isNilOrEmpty(city);
    const noCountryName = isNilOrEmpty(countryName);

    if (noCity && noCountryName) {
      return null;
    }

    if (noCity) {
      return countryName;
    }

    return `${city}, ${countryName}`;
  },
);
