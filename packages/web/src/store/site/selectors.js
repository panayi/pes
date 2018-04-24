import * as R from 'ramda';
import { createSelector } from 'reselect';
import env from '@pesposa/core/src/config/env';
import * as phoneNumbersConfig from '@pesposa/core/src/config/phoneNumbers';
import * as constants from './constants';

export const siteSelector = R.path(constants.ROOT_KEY);

export const countrySelector = R.path(constants.COUNTRY_PATH);

export const countryCodeSelector = createSelector(
  countrySelector,
  R.prop('cca2'),
);

export const countryNameSelector = createSelector(
  countrySelector,
  R.path(['name', 'common']),
);

export const countryDomainSelector = createSelector(
  countryCodeSelector,
  countryCode => `${R.toLower(countryCode)}.${env.domain}`,
);

export const phoneNumberConfigSelector = createSelector(
  countryCodeSelector,
  R.prop(R.__, phoneNumbersConfig.BY_COUNTRY),
);
