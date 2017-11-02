import * as constants from 'services/firebase/constants';

export default {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: constants.FIREBASE_DOMAIN,
  databaseURL: constants.FIREBASE_DATABASE_URL,
  storageBucket: constants.FIREBASE_STORAGE_BUCKET,
};
