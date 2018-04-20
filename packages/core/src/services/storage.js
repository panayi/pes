import gcloud from 'google-cloud';
import uuid from 'uuid-v4';
import * as storageConfig from '../config/storage';
import serviceAccountKey from '../config/serviceAccountKey.json';

const storageClient = gcloud.storage({
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  credentials: serviceAccountKey,
});

const storage = storageClient.bucket(storageConfig.BUCKET);

const getFileUrl = (path, token) =>
  `https://firebasestorage.googleapis.com/v0/b/${
    storageConfig.BUCKET
  }/o/${encodeURIComponent(path)}?alt=media&token=${token}`;

export const readFile = path => {
  const file = storage.file(path);
  return new Promise((resolve, reject) => {
    file.download((error, contents) => {
      if (error) {
        reject(error);
      } else {
        resolve(contents);
      }
    });
  });
};

export const writeFile = (buffer, contentType, path, metadata) =>
  new Promise((resolve, reject) => {
    const file = storage.file(path);
    const stream = file.createWriteStream({
      uploadType: 'media',
      metadata: {
        contentType,
        metadata,
      },
    });

    stream.on('error', error => reject(error));
    stream.on('finish', () => {
      resolve();
    });
    stream.end(buffer);
  });

export const uploadImage = async (
  buffer,
  contentType,
  path,
  filename,
  saveMetadata,
) => {
  const finalPath = `${path}/${filename}`;
  const token = uuid();
  const metadata = {
    firebaseStorageDownloadTokens: token,
  };

  await writeFile(buffer, contentType, finalPath, metadata);

  if (saveMetadata) {
    const metadataToSave = {
      name: filename,
      fullPath: finalPath,
      downloadURL: getFileUrl(path, token),
    };
    await saveMetadata(metadataToSave);
  }

  return finalPath;
};

export const removeFile = path => {
  const file = storage.file(path);
  return file.delete();
};
