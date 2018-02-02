/* @flow */
import * as R from 'ramda';
import { storage as storageConstants } from 'pesposa-core/constants';
import { generateId } from 'pesposa-core/utils';
import api from 'services/api';

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
