/* @flow */
import * as R from 'ramda';
import * as storageConstants from 'constants/storage';
import api from 'services/api';
import generateId from 'utils/generateId';

export const uploadImage = (file: File, dbPath: string) => (
  dispatch: Dispatch,
) =>
  dispatch(
    api.files.create(
      `${storageConstants.IMAGES_PATH}/${generateId()}`,
      file,
      dbPath,
    ),
  );

export const uploadImages = (files: Array<File>, dbPath: string) => (
  dispatch: Dispatch,
) => Promise.all(R.map(file => dispatch(uploadImage(file, dbPath)), files));
