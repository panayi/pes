import gcloud from 'google-cloud';
import { constants } from '../../../src/store/storage';

const storage = gcloud.storage({
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  keyFilename: 'shared/serviceAccountKey.json',
});

export default storage.bucket(constants.BUCKET);
