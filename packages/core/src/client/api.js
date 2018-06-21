import env from '../config/env';

require('es6-promise').polyfill();
require('isomorphic-fetch');

export const migrateAnonymousUser = ({ token, anonymousUserToken }) => {
  const url = `${env.firebaseFunctionsBaseUrl}/users/migrate`;

  return fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Anonymous-Authorization': `Bearer ${anonymousUserToken}`,
    },
  });
};

export const setUserInfo = token => {
  const url = `${env.firebaseFunctionsBaseUrl}/users/info`;
  return fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const reverseGeocode = async data => {
  const url = `${env.firebaseFunctionsBaseUrl}/reverse-geocode`;

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.ok ? response.json() : null;
};

export const geoip = async data => {
  const url = `${env.firebaseFunctionsBaseUrl}/geoip`;

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.ok ? response.json() : null;
};
