import * as firebaseConfig from '@pesposa/core/src/config/firebase';

const urlForPath = path => `https://${firebaseConfig.FIREBASE_DOMAIN}${path}`;

export default urlForPath;
