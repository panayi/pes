import { API_APP_BASE_URL } from 'constants/firebase';

export const setCurrentUserIp = ({ token }) => () => {
  const url = `${API_APP_BASE_URL}/users/ip`;

  return fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const migrateAnonymousUser = ({ token, anonymousUserToken }) => () => {
  const url = `${API_APP_BASE_URL}/users/migrate`;

  return fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Anonymous-Authorization': `Bearer ${anonymousUserToken}`,
    },
  });
};
