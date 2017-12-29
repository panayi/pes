import { constants as firebaseConstants } from 'store/firebase';
import { constants as storageConstants } from 'store/storage';

export default {
  apiKey: firebaseConstants.FIREBASE_API_KEY,
  authDomain: firebaseConstants.FIREBASE_DOMAIN,
  databaseURL: firebaseConstants.FIREBASE_DATABASE_URL,
  storageBucket: storageConstants.BUCKET,
};
