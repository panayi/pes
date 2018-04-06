export const create = (firebase, storagePath, file, dbPath, options) =>
  firebase.uploadFile(storagePath, file, dbPath, options);

export const remove = (firebase, storagePath, dbPath) =>
  firebase.deleteFile(storagePath, dbPath);
