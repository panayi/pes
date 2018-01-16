import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import geoip from 'geoip-lite';

const getLocationFromIp = ip => {
  if (isNilOrEmpty(ip)) {
    return null;
  }

  const result = geoip.lookup(ip);
  const coords = R.propOr([], 'll', result);
  const latitude = coords[0];
  const longitude = coords[1];

  if (isNilOrEmpty(latitude) || isNilOrEmpty(longitude)) {
    return null;
  }

  return {
    latitude,
    longitude,
  };
};

export default getLocationFromIp;
