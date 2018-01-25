import { API_APP_BASE_URL } from 'constants/firebase';

export const setCurrentUserLocation = (data, { token }) => () => {
  const url = `${API_APP_BASE_URL}/users/location`;

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
  const url = `${API_APP_BASE_URL}/users/migrate`;

  return fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Anonymous-Authorization': `Bearer ${anonymousUserToken}`,
    },
  });
};
