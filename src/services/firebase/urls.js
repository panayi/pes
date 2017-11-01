import * as constants from './constants';

export const getDataUrl = path =>
  `${constants.FIREBASE_CONSOLE_BASE_URL}/${constants.FIREBASE_PROJECT_ID}/database/data/${path}`;

export const getStorageUrl = path =>
  `${constants.FIREBASE_CONSOLE_BASE_URL}/${constants.FIREBASE_PROJECT_ID}/storage/${constants.FIREBASE_STORAGE_BUCKET}/files/${path}`;
