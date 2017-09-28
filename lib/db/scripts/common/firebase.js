import * as admin from 'firebase-admin';
import serviceAccount from './test-768f2-firebase-adminsdk-lhb9k-f912795590.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://test-768f2.firebaseio.com',
});

const database = admin.database();

export default database;
