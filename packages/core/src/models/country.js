import * as R from 'ramda';
import supportedCountries from '../config/countries';

export const getAll = R.always(supportedCountries);

export const getDefault = R.compose(R.find(R.prop('default')), getAll);

export const isCountrySupported = countryCode =>
  R.compose(R.find(R.propEq('code', countryCode)), getAll)();
