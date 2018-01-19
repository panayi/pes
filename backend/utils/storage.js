import gcloud from 'google-cloud';
import * as storageConstants from 'frontend/constants/storage';

const storage = gcloud.storage({
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  keyFilename: 'backend/lib/serviceAccountKey.json',
});

export default storage.bucket(storageConstants.BUCKET);
