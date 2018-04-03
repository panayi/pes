import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import requestIp from 'request-ip';
import geoip from 'geoip-lite';
import env from '../config/env';
import * as gmapsService from '../services/gmaps';

export const getFromGeoposition = async geoposition => {
  const address = await gmapsService.reverseGeocode(geoposition);
  const location = {
    geoposition,
    address,
    from: 'navigator.geolocation',
  };

  return location;
};

export const getFromIp = (ip, req) => {
  const finalIp =
    ip || (env.isDevelopment ? '80.244.26.50' : requestIp.getClientIp(req));

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
      country: R.prop('country', result),
    },
    from: 'IP',
  };

  return location;
};
