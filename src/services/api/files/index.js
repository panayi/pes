/* @flow */

export const create = (storagePath: string, file: File, dbPath: string) => (
  dispatch: Dispatch,
  getState: Function,
  getFirebase: Function,
) => getFirebase().uploadFile(storagePath, file, dbPath);
