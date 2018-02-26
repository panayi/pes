/* @flow */
import * as R from 'ramda';
import { storage as storageConfig } from 'pesposa-config';
import { generateId } from 'pesposa-utils';
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
