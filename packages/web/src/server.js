import express from 'express';
import firebase from 'firebase-admin';
import env from '@pesposa/core/src/config/env';
import serviceAccountKey from '@pesposa/core/src/config/serviceAccountKey.json';
import appRoute from 'server/routes/app';
import createStore from 'server/middleware/createStore';
import setLocation from 'server/middleware/setLocation';
import setLanguage from 'server/middleware/setLanguage';

// Create Firebase app
if (!firebase.apps.length) {
  firebase.initializeApp({
    databaseURL: env.firebaseDatabaseUrl,
    credential: firebase.credential.cert(serviceAccountKey),
  });
}

const server = express();

// Application-level Middleware
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR));

// Default route
server.get('/*', createStore, setLocation, setLanguage, appRoute);

export default server;
