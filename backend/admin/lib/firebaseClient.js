import createFirebaseClient from 'createFirebaseClient';

const firebaseClient = createFirebaseClient({
  databaseURL: `https://${
    process.env.REACT_APP_FIREBASE_PROJECT_ID
  }.firebaseio.com`,
});

export const database = firebaseClient.database();
export const auth = firebaseClient.auth();

export default firebaseClient;
