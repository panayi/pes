import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import gmaps from '@google/maps';
import env from '../config/env';

const client = gmaps.createClient({
  key: env.googleApisServerKey,
});

// Find all gMaps types here:
// https://developers.google.com/maps/documentation/geocoding/intro#Types
const findComponentByType = (types, results) =>
  R.compose(
    R.prop('short_name'),
    R.defaultTo({}),
    R.find(
      R.compose(R.not, R.isEmpty, R.intersection(types), R.propOr([], 'types')),
    ),
  )(results);

const extractAddress = result => {
  const components = R.pathOr(
    [],
    ['json', 'results', 0, 'address_components'],
    result,
  );

  const address = {
    street: findComponentByType(
      ['street_address', 'route', 'intersection'],
      components,
    ),
    city: findComponentByType(
      [
        'locality',
        'administrative_area_level_1',
        'administrative_area_level_2',
        'administrative_area_level_3',
        'administrative_area_level_4',
        'administrative_area_level_5',
      ],
      components,
    ),
    country: findComponentByType(['country'], components),
    postalCode: findComponentByType(['postal_code'], components),
  };

  return R.reject(isNilOrEmpty, address);
};

export const reverseGeocode = (geoposition = {}) => {
  const { latitude, longitude } = geoposition;

  return new Promise((resolve, reject) => {
    client.reverseGeocode(
      { latlng: [latitude, longitude] },
      (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(extractAddress(response));
        }
      },
    );
  });
};
