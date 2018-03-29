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

// BETA

const createBetaUser = (data, token) => () => {
  // const url = `${env.firebaseFunctionsBaseUrl}/beta-users/create`;
  const url =
    'http://localhost:5000/pesposa-dev/us-central1/api/beta-users/create';

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
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
  createBetaUser,
  reverseGeocode,
  geoip,
};

export default api;
