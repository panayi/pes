import * as R from 'ramda';
import * as geolocationConfig from '@pesposa/core/src/config/geolocation';

const DEFAULT_OPTIONS = {
  enableHighAccuracy: true,
  timeout: geolocationConfig.TIMEOUT,
  maximumAge: geolocationConfig.MAXIMUM_AGE, // cache position for `maximumAge`
};

const getCurrentPosition = options => {
  const finalOptions = R.merge(DEFAULT_OPTIONS, options);

  return new Promise((resolve, reject) => {
    const supported = 'geolocation' in navigator;

    if (!supported) {
      reject('Geolocation API not supported');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position =>
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      reject,
      finalOptions,
    );
  });
};

export default getCurrentPosition;
