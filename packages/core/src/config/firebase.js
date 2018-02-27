import env from './env';

export const FIREBASE_DOMAIN = `${env.firebaseProjectId}.firebaseapp.com`;
export const FIREBASE_DATABASE_URL = `https://${
  env.firebaseProjectId
}.firebaseio.com`;
export const FIREBASE_CONSOLE_BASE_URL =
  'https://console.firebase.google.com/u/0/project';
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