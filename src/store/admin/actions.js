import { getFunctionsUrl } from 'services/firebase/urls';
import { tokenSelector } from 'store/auth/selectors';

export const initializeFirebaseDb = () => (dispatch, getState) => {
  const token = tokenSelector(getState());
  const url = getFunctionsUrl('firebase/initialize');

  /* eslint-disable no-alert */
  fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(() => alert('Seed: Done!'))
    .catch(() => alert('Seed: Failed. Please check functions logs.'));
  /* eslint-enable no-alert */
};

export const initializeAlgolia = () => (dispatch, getState) => {
  const token = tokenSelector(getState());
  const url = getFunctionsUrl('algolia/initialize');

  /* eslint-disable no-alert */
  fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(() => alert('Algolia Bootstrap: Done!'))
    .catch(() => alert('Algolia Bootstrap: Failed. Please check functions logs.'));
  /* eslint-enable no-alert */
};
