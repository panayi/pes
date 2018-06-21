import gcloud from 'google-cloud';
import uuid from 'uuid-v4';
import * as storageConfig from '@pesposa/core/src/config/storage';
import serviceAccountKey from '@pesposa/core/src/config/serviceAccountKey.json';

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

export const uploadFile = async (
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

  const metadataToSave = {
    name: filename,
    fullPath: finalPath,
    downloadURL: getFileUrl(finalPath, token),
  };

  if (saveMetadata) {
    await saveMetadata(metadataToSave);
  }

  return metadataToSave;
};

export const removeFile = path => {
  const file = storage.file(path);
  return file.delete();
};
