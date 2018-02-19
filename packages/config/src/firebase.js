export const FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
export const FIREBASE_PROJECT_ID = process.env.REACT_APP_FIREBASE_PROJECT_ID;
export const FIREBASE_DOMAIN = `${FIREBASE_PROJECT_ID}.firebaseapp.com`;
export const FIREBASE_DATABASE_URL = `https://${FIREBASE_PROJECT_ID}.firebaseio.com`;
export const FIREBASE_CONSOLE_BASE_URL =
  'https://console.firebase.google.com/u/0/project';
export const API_APP_BASE_URL =
  process.env.REACT_APP_FIREBASE_FUNCTIONS_BASE_URL;
export const FIREBASE_PATH = ['firebase'];

export const PROVIDER_IDS = {
  facebook: 'facebook.com',
  google: 'google.com',
  phone: 'phone',
  twitter: 'twitter',
  github: 'github',
};

export const FIREBASE_AUTH_PROVIDER_CLASS = {
  [PROVIDER_IDS.facebook]: 'FacebookAuthProvider',
  [PROVIDER_IDS.google]: 'GoogleAuthProvider',
  [PROVIDER_IDS.phone]: 'PhoneAuthProvider',
  [PROVIDER_IDS.twitter]: 'TwitterAuthProvider',
  [PROVIDER_IDS.github]: 'GithubAuthProvider',
};
