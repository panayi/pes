import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { createSelector } from 'reselect';
import * as countryModel from '@pesposa/core/src/models/country';
import * as languageModel from '@pesposa/core/src/models/language';

import * as constants from './constants';

const countries = countryModel.getAll();
const defaultCountry = countryModel.getDefault();
const defaultLanguage = languageModel.getDefault();

export const actualLocationSelector = R.path(constants.LOCATION_PATH);

export const locationSelector = createSelector(
  actualLocationSelector,
  location => {
    const countryCode = R.path(['address', 'country'], location);
    return countryModel.isCountrySupported(countryCode)
      ? location
      : {
          address: {
            country: defaultCountry.code,
          },
          geoposition: defaultCountry.geoposition,
          from: 'default',
        };
  },
);

export const languageSelector = R.pathOr(
  defaultLanguage,
  constants.LANGUAGE_PATH,
);

export const isBotSelector = R.path(constants.IS_BOT_PATH);

export const geopositionSelector = createSelector(
  locationSelector,
  R.prop('geoposition'),
);

const addressSelector = createSelector(locationSelector, R.prop('address'));

export const countryCodeSelector = createSelector(
  addressSelector,
  R.prop('country'),
);

export const countrySelector = createSelector(
  countryCodeSelector,
  countryCode => R.find(R.propEq('code', countryCode), countries),
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
