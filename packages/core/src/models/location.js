import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import geoip from 'geoip-lite';
import * as gmapsService from '../services/gmaps';
import * as countryModel from './country';

const filterNonSupportedCountry = async location => {
  const countryCode = R.path(['address', 'country'], location);
  const countrySnapshot = await countryModel.get(countryCode);
  const country = countrySnapshot.val();

  // Location is outside of the supported countries
  if (isNilOrEmpty(country)) {
    const defaultCountry = await countryModel.getDefault();
    return {
      address: {
        country: defaultCountry.code,
      },
      geoposition: defaultCountry.geoposition,
      from: 'default',
    };
  }

  return location;
};

export const getFromGeoposition = async geoposition => {
  const address = await gmapsService.reverseGeocode(geoposition);
  const location = {
    geoposition,
    address,
    from: 'navigator.geolocation',
  };

  return filterNonSupportedCountry(location);
};

export const getFromIp = async ip => {
  if (isNilOrEmpty(ip)) {
    return null;
  }

  const result = geoip.lookup(ip);
  const [latitude, longitude] = R.propOr([], 'll', result);
  const geoposition =
    latitude && longitude
      ? {
          latitude,
          longitude,
        }
      : null;
  const location = {
    geoposition,
    address: {
      city: R.prop('city', result),
      country: R.prop('country', result),
    },
    from: 'IP',
  };

  return filterNonSupportedCountry(location);
};

export const get = async (geoposition, ip) =>
  isNilOrEmpty(geoposition) ? getFromIp(ip) : getFromGeoposition(geoposition);
