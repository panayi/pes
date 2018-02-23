/* @flow */
import * as R from 'ramda';
import * as functions from 'firebase-functions';
import admin from 'firebase-admin';
import { env } from 'pesposa-config';
import serviceAccountKey from 'pesposa-config/src/serviceAccountKey.json';

const isFirebaseFunctionsEnv = process.env.IS_FIREBASE_FUNCTIONS_ENV;

const createFirebaseClient = baseConfig => {
  const config = R.merge(baseConfig, {
    credential: admin.credential.cert(serviceAccountKey),
  });

  admin.initializeApp(config);

  return admin;
};

const firebaseConfig = isFirebaseFunctionsEnv
  ? functions.config().firebase
  : {
      databaseURL: `https://${env.firebaseProjectId}.firebaseio.com`,
    };

const firebaseClient = createFirebaseClient(firebaseConfig);

export const database = firebaseClient.database();
export const auth = firebaseClient.auth();

export default firebaseClient;
