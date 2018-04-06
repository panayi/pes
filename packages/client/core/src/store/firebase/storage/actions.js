import * as R from 'ramda';
import * as storageConfig from '@pesposa/core/src/config/storage';
import generateId from '@pesposa/core/src/utils/generateId';
import * as filesClient from '@pesposa/core/src/client/files';

export const uploadImage = (file, dbPath, name) => (
  dispatch,
  getState,
  getFirebase,
) =>
  filesClient.create(getFirebase(), storageConfig.IMAGES_PATH, file, dbPath, {
    name: name || generateId,
  });

export const uploadImages = (files, dbPath) => dispatch =>
  Promise.all(R.map(file => dispatch(uploadImage(file, dbPath)), files));

export const deleteImage = (filePath, dbPath) => (
  dispatch,
  getState,
  getFirebase,
) => filesClient.remove(getFirebase(), filePath, dbPath);
