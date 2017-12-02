import {
  FIREBASE_PROJECT_ID,
  FIREBASE_CONSOLE_BASE_URL,
} from '../firebase/constants';
import { BUCKET } from './constants';

export const fileMetadataFactory = uploadRes => {
  // upload response from Firebase's storage upload
  const { metadata: { name, fullPath, downloadURLs } } = uploadRes;
  // default factory includes name, fullPath, downloadURL
  return {
    name,
    fullPath,
    downloadURL: downloadURLs[0],
  };
};

export const getStorageUrl = path =>
  `${FIREBASE_CONSOLE_BASE_URL}/${FIREBASE_PROJECT_ID}/storage/${
    BUCKET
  }/files/${path}`;
