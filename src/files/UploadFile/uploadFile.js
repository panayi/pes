/* @flow */
import generateId from '../../lib/helpers/generateId';
import * as storagePaths from '../constants/storagePaths';

// ------------------------------------
// Actions
// ------------------------------------

export const uploadFile = (storagePath: string, file: File, dbPath: string) =>
  (dispatch: Dispatch, getState: Function, getFirebase: Function) => (
    getFirebase().uploadFile(storagePath, file, dbPath)
  );

export const uploadImage = (file: File, dbPath: string) => (dispatch: Dispatch) => (
  dispatch(uploadFile(`${storagePaths.IMAGES}/${generateId()}`, file, dbPath))
);

export const actions = {
  uploadFile,
  uploadImage,
};
