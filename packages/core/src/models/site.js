import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import env from '../config/env';
import getCountryByCode from '../utils/getCountryByCode';

export const get = req => {
  const host = req.headers['x-forwarded-host'] || req.get('host');
  const countryCode = R.compose(R.toUpper, R.head, R.split('.'))(host);
  const siteForCountryCodeExists = R.contains(countryCode, env.countrySites);

  if (!isNilOrEmpty(countryCode) && siteForCountryCodeExists) {
    return {
      countryCode,
      country: getCountryByCode(countryCode),
    };
  }

  return null;
};
