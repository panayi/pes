import * as R from 'ramda';

const DEFAULT_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 15000, // 15 sec
};

export const getCurrentPosition = options => {
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
