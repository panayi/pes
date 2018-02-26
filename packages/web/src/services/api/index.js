import { env } from 'pesposa-config';

require('es6-promise').polyfill();
require('isomorphic-fetch');

const setCurrentUserInfo = (data, { token }) => () => {
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
  const url = '/_token';

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
  const url = '/_token';
  return fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  });
};

const api = {
  setCurrentUserInfo,
  migrateAnonymousUser,
  createSession,
  deleteSession,
};

export default api;
