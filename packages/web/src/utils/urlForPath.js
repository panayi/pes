import { firebase as firebaseConfig } from 'pesposa-config';

const urlForPath = path => `https://${firebaseConfig.FIREBASE_DOMAIN}${path}`;

export default urlForPath;
