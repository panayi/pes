import * as R from 'ramda';
import * as functions from 'firebase-functions';
import admin from 'firebase-admin';
import serviceAccountKey from './serviceAccountKey.json';

const createFirebaseClient = baseConfig => {
  const config = R.merge(baseConfig, {
    credential: admin.credential.cert(serviceAccountKey),
  });

  admin.initializeApp(config);

  return admin;
};

const firebaseConfig = process.env.IS_FIREBASE_FUNCTIONS
  ? functions.config().firebase
  : {
      databaseURL: `https://${
        process.env.REACT_APP_FIREBASE_PROJECT_ID
      }.firebaseio.com`,
    };

const firebaseClient = createFirebaseClient(firebaseConfig);

export const database = firebaseClient.database();
export const auth = firebaseClient.auth();

export default firebaseClient;
