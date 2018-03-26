import env from '@pesposa/core/src/config/env';

require('es6-promise').polyfill();
require('isomorphic-fetch');

const migrateAnonymousUser = ({ token, anonymousUserToken }) => () => {
  const url = `${env.firebaseFunctionsBaseUrl}/users/migrate`;

  return fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Anonymous-Authorization': `Bearer ${anonymousUserToken}`,
    },
  });
};

const createSession = token => () => {
  const url = '/token';

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
    body: JSON.stringify({ token }),
  });
};

const deleteSession = () => () => {
  const url = '/token';
  return fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  });
};

const reverseGeocode = data => async () => {
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

const geoip = () => async () => {
  const url = `${env.firebaseFunctionsBaseUrl}/geoip`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.ok ? response.json() : null;
};

const api = {
  migrateAnonymousUser,
  createSession,
  deleteSession,
  reverseGeocode,
  geoip,
};

export default api;
