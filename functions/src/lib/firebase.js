import * as functions from 'firebase-functions';
import admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

export const database = admin.database();
export const auth = admin.auth();

export default admin;
