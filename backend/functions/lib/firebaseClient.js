import * as functions from 'firebase-functions';
import createFirebaseClient from 'createFirebaseClient';

const firebaseClient = createFirebaseClient(functions.config().firebase);

export const database = firebaseClient.database();
export const auth = firebaseClient.auth();

export default firebaseClient;
