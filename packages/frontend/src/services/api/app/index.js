import { firebase as firebaseConstants } from 'pesposa-core/constants';

export const setCurrentUserInfo = (data, { token }) => () => {
  const url = `${firebaseConstants.API_APP_BASE_URL}/users/current/info`;

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
  const url = `${firebaseConstants.API_APP_BASE_URL}/users/migrate`;

  return fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Anonymous-Authorization': `Bearer ${anonymousUserToken}`,
    },
  });
};
