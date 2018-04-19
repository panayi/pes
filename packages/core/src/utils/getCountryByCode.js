import * as R from 'ramda';
import countries from 'world-countries/countries.json';

const getCountryByCode = countryCode => {
  const upperCasedCountryCode = R.toUpper(countryCode);
  return R.find(({ cca2 }) => cca2 === upperCasedCountryCode, countries);
};

export default getCountryByCode;
