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

export const uploadImage = (
  buffer,
  contentType,
  path,
  filename,
  saveMetadata,
) =>
  new Promise((resolve, reject) => {
    const finalPath = `${path}/${filename}`;
    const file = storage.file(finalPath);
    const token = uuid();
    const stream = file.createWriteStream({
      uploadType: 'media',
      metadata: {
        contentType,
        metadata: {
          firebaseStorageDownloadTokens: token,
        },
      },
    });

    stream.on('error', error => reject(error));
    stream.on('finish', async () => {
      if (saveMetadata) {
        const metadata = {
          name: filename,
          fullPath: finalPath,
          downloadURL: getFileUrl(finalPath, token),
        };
        await saveMetadata(metadata);
      }

      resolve(finalPath);
    });
    stream.end(buffer);
  });
