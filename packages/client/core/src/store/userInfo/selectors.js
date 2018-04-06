import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { createSelector } from 'reselect';
import * as languageConfig from '@pesposa/core/src/config/language';
import * as locationConfig from '@pesposa/core/src/config/location';
import { selectors as siteSelectors } from '../site';
import * as constants from './constants';

const defaultLanguage = languageConfig.getDefault();

export const ipSelector = R.path(constants.IP_PATH);

export const locationSelector = R.path(constants.LOCATION_PATH);

export const languageSelector = R.pathOr(
  defaultLanguage,
  constants.LANGUAGE_PATH,
);

export const isBotSelector = R.path(constants.IS_BOT_PATH);

export const userAgentSelector = R.path(constants.USER_AGENT_PATH);

export const geopositionSelector = createSelector(
  locationSelector,
  R.prop('geoposition'),
);

const addressSelector = createSelector(locationSelector, R.prop('address'));

export const countrySelector = createSelector(
  addressSelector,
  R.prop('country'),
);

export const citySelector = createSelector(addressSelector, R.prop('city'));

export const countryCodeSelector = createSelector(
  countrySelector,
  R.prop('cca2'),
);

export const countryNameSelector = createSelector(
  countrySelector,
  R.path(['name', 'common']),
);

const getAddressString = (countryName, city) => {
  const noCity = isNilOrEmpty(city);
  const noCountryName = isNilOrEmpty(countryName);

  if (noCity && noCountryName) {
    return null;
  }

  if (noCity) {
    return countryName;
  }

  return `${city}, ${countryName}`;
};

export const addressStringSelector = createSelector(
  countryNameSelector,
  citySelector,
  getAddressString,
);

export const isInSameCountrySelector = createSelector(
  countryCodeSelector,
  siteSelectors.countryCodeSelector,
  R.equals,
);

const locationForSiteSelector = createSelector(
  isInSameCountrySelector,
  locationSelector,
  siteSelectors.countrySelector,
  (isInSameCountry, userLocation, siteCountry) => {
    if (isInSameCountry) {
      return userLocation;
    }

    return {
      geoposition: {
        latitude: siteCountry.latlng[0],
        longitude: siteCountry.latlng[1],
      },
      address: {
        country: siteCountry,
      },
      source: locationConfig.DEFAULT_SOURCE_ID,
    };
  },
);

export const geopositionForSiteSelector = createSelector(
  locationForSiteSelector,
  R.prop('geoposition'),
);

const addressForSiteSelector = createSelector(
  locationForSiteSelector,
  R.prop('address'),
);

const countryForSiteSelector = createSelector(
  addressForSiteSelector,
  R.prop('country'),
);

const cityForSiteSelector = createSelector(
  addressForSiteSelector,
  R.prop('city'),
);

const countryNameForSiteSelector = createSelector(
  countryForSiteSelector,
  R.path(['name', 'common']),
);

export const addressStringForSiteSelector = createSelector(
  countryNameForSiteSelector,
  cityForSiteSelector,
  getAddressString,
);
