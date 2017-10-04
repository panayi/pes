import { combineReducers } from 'redux';
import { tokenSelector } from '../auth/auth';
import syncReducer from './Sync/sync';

const getFunctionsUrl = path => `${process.env.REACT_APP_FIREBASE_FUNCTIONS_BASE_URL}/${path}`;

// ------------------------------------
// Actions
// ------------------------------------

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

export const actions = {
  initializeFirebaseDb,
  initializeAlgolia,
};

// ------------------------------------
// Reducer
// ------------------------------------

export default combineReducers({
  sync: syncReducer,
});
