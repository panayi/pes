import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import getCountryByCode from '../utils/getCountryByCode';

export const get = req => {
  const host = req.headers['x-forwarded-host'] || req.get('host');
  const countryCode = R.compose(R.head, R.split('.'))(host);
  const country = isNilOrEmpty(countryCode)
    ? null
    : getCountryByCode(countryCode);

  return {
    countryCode,
    country,
  };
};
