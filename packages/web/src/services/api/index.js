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

const setUserInfo = token => () => {
  const url = `${env.firebaseFunctionsBaseUrl}/users/info`;
  return fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
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

const geoip = data => async () => {
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

// BETA

const createBetaUser = (data, token) => () => {
  const url = `${env.firebaseFunctionsBaseUrl}/beta-users`;

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

const createBetaCodeAndUser = token => () => {
  const url = `${env.firebaseFunctionsBaseUrl}/beta`;

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

const api = {
  migrateAnonymousUser,
  setUserInfo,
  reverseGeocode,
  geoip,
  createBetaUser,
  createBetaCodeAndUser,
};

export default api;
