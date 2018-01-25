import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import geoip from 'geoip-lite';

const getLocationFromIp = ip => {
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

  return {
    geoposition,
    address: {
      city: R.prop('city', result),
      country: R.prop('country', result),
    },
  };
};

export default getLocationFromIp;
