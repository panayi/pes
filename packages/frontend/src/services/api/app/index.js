import { firebase as firebaseConfig } from 'pesposa-config';

export const setCurrentUserInfo = (data, { token }) => () => {
  const url = `${firebaseConfig.API_APP_BASE_URL}/users/current/info`;

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
  const url = `${firebaseConfig.API_APP_BASE_URL}/users/migrate`;

  return fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Anonymous-Authorization': `Bearer ${anonymousUserToken}`,
    },
  });
};
