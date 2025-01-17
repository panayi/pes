import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import env from './env';
import getSubdomain from '../utils/getSubdomain';
import getCountryByCode from '../utils/getCountryByCode';

export const get = req => {
  const countryCode = R.compose(
    R.toUpper,
    R.defaultTo(''),
    getSubdomain,
  )(req);
  const siteForCountryCodeExists = R.contains(countryCode, env.countrySites);

  if (!isNilOrEmpty(countryCode) && siteForCountryCodeExists) {
    return {
      countryCode,
      country: getCountryByCode(countryCode),
    };
  }

  return null;
};
