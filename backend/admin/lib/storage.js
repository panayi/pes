import gcloud from 'google-cloud';
import { FIREBASE_STORAGE_BUCKET } from '../../../src/services/firebase/constants';

const storage = gcloud.storage({
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  keyFilename: 'backend/shared/serviceAccountKey.json',
});

export default storage.bucket(FIREBASE_STORAGE_BUCKET);
