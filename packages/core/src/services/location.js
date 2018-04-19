import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import requestIp from 'request-ip';
import geoip from 'geoip-lite';
import * as locationConfig from '../config/location';
import getCountryByCode from '../utils/getCountryByCode';
import * as gmapsService from '../services/gmaps';

export const getFromGeoposition = async geoposition => {
  const address = await gmapsService.reverseGeocode(geoposition);
  const finalAddress = R.evolve(
    {
      country: getCountryByCode,
    },
    address,
  );
  const location = {
    geoposition,
    address: finalAddress,
    source: locationConfig.GEOLOCATION_SOURCE_ID,
  };

  return location;
};

export const getFromIp = (ip, req) => {
  // If we are working locally, the IP sent from the local web server
  // is not the public IP. In this case, get the IP
  // from the request which contains the real public IP.
  const finalIp = ip === '::ffff:127.0.0.1' ? requestIp.getClientIp(req) : ip;

  if (isNilOrEmpty(finalIp)) {
    return null;
  }

  const result = geoip.lookup(finalIp);
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
      country: R.compose(getCountryByCode, R.prop('country'))(result),
    },
    source: locationConfig.IP_SOURCE_ID,
  };

  return location;
};
