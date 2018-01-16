import { API_APP_BASE_URL } from 'constants/firebase';

export const setUserIp = (userId, { token }) => () => {
  const url = `${API_APP_BASE_URL}/users/${userId}/ip`;

  return fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
