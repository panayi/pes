import { env } from 'pesposa-config';

require('es6-promise').polyfill();
require('isomorphic-fetch');

export const setCurrentUserInfo = (data, { token }) => () => {
  const url = `${env.firebaseFunctionsBaseUrl}/users/current/info`;

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const migrateAnonymousUser = ({ token, anonymousUserToken }) => () => {
  const url = `${env.firebaseFunctionsBaseUrl}/users/migrate`;

  return fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Anonymous-Authorization': `Bearer ${anonymousUserToken}`,
    },
  });
};

export const createSession = token => () => {
  const url = '/api/token';

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
    body: JSON.stringify({ token }),
  });
};

export const deleteSession = () => () => {
  const url = '/api/token';
  return fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  });
};
