import Rebase from 're-base';
import firebase from 'firebase/app';
import database from 'firebase/database';

require('firebase/auth');

// FIXME: This is to avoid the error:
// `Firebase: Firebase App named '[DEFAULT]' already exists (app/duplicate-app).`
// Find a cleaner way to fix this.
const name = Math.random().toString(36).substring(7);

const app = firebase.initializeApp({
  apiKey: 'AIzaSyDqwM_WYZLPllRbSqbxpYhWuklXhl4-gAU',
  authDomain: 'test-768f2.firebaseapp.com',
  databaseURL: 'https://test-768f2.firebaseio.com',
  projectId: 'test-768f2',
}, name);

const db = database(app);
const base = Rebase.createClass(db);

export default base;

export {
  app,
};
