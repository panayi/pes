import * as functions from 'firebase-functions';
import * as R from 'ramda';
import admin from 'firebase-admin';
import serviceAccountKey from './serviceAccountKey.json';

const config = R.merge(functions.config().firebase, {
  credential: admin.credential.cert(serviceAccountKey),
});

admin.initializeApp(config);

export const database = admin.database();
export const auth = admin.auth();

export default admin;
