/* @flow */
import * as R from 'ramda';
import generateId from '../../utils/generateId';
import { IMAGES_PATH } from './constants';

export const uploadFile = (storagePath: string, file: File, dbPath: string) =>
  (dispatch: Dispatch, getState: Function, getFirebase: Function) => (
    getFirebase().uploadFile(storagePath, file, dbPath)
  );

export const uploadImage = (file: File, dbPath: string) => (dispatch: Dispatch) => (
  dispatch(uploadFile(`${IMAGES_PATH}/${generateId()}`, file, dbPath))
);

export const uploadImages = (files: Array<File>, dbPath: string) => (dispatch: Dispatch) => (
  Promise.all(R.map(
    file => dispatch(uploadImage(file, dbPath)),
    files,
  ))
);
