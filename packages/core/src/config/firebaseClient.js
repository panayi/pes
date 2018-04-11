/* @flow */
import * as R from 'ramda';
import 'firebase-functions';
import * as admin from 'firebase-admin';
import env from './env';
import serviceAccountKey from './serviceAccountKey.json';

const createFirebaseClient = baseConfig => {
  const config = R.merge(baseConfig, {
    credential: admin.credential.cert(serviceAccountKey),
  });

  admin.initializeApp(config);

  return admin;
};

const firebaseConfig = {
  databaseURL: env.firebaseDatabaseUrl,
};

const firebaseClient = createFirebaseClient(firebaseConfig);

export const database = firebaseClient.database();
export const auth = firebaseClient.auth();

export default firebaseClient;
