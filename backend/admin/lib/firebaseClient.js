import createFirebaseClient from 'createFirebaseClient';

const firebaseClient = createFirebaseClient({
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
});

export const database = firebaseClient.database();
export const auth = firebaseClient.auth();

export default firebaseClient;
