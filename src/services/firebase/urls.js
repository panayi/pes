const FIREBASE_CONSOLE_BASE_URL = 'https://console.firebase.google.com/u/0/project';

export const getFunctionsUrl = path => `${process.env.REACT_APP_FIREBASE_FUNCTIONS_BASE_URL}/${path}`;

export const getDataUrl = path =>
  `${FIREBASE_CONSOLE_BASE_URL}/${process.env.REACT_APP_FIREBASE_PROJECT_ID}/database/data/${path}`;

export const getStorageUrl = path =>
  `${FIREBASE_CONSOLE_BASE_URL}/${process.env.REACT_APP_FIREBASE_PROJECT_ID}/storage/${process.env.REACT_APP_STORAGE_BUCKET}/files/${path}`;
