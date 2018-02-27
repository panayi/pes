/* @flow */
import * as R from 'ramda';
import * as storageConfig from '@pesposa/core/src/config/storage';
import generateId from '@pesposa/core/src/utils/generateId';
import firebaseApi from 'services/firebase';

export const uploadImage = (file: File, dbPath: string) => (
  dispatch: Dispatch,
) =>
  dispatch(
    firebaseApi.files.create(
      `${storageConfig.IMAGES_PATH}/${generateId()}`,
      file,
      dbPath,
    ),
  );

export const uploadImages = (files: Array<File>, dbPath: string) => (
  dispatch: Dispatch,
) => Promise.all(R.map(file => dispatch(uploadImage(file, dbPath)), files));

export const deleteImage = (image: Object, dbPath: string) => (
  dispatch: Dispatch,
) => dispatch(firebaseApi.files.remove(image.fullPath, dbPath));
