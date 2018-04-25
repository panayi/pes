import express from 'express';
import morgan from 'morgan';
import firebase from 'firebase-admin';
import env from '@pesposa/core/src/config/env';
import serviceAccountKey from '@pesposa/core/src/config/serviceAccountKey.json';
import appRoute from 'server/routes/app';
import redirectLegacyUrl from 'server/middleware/redirectLegacyUrl';
import createStore from 'server/middleware/createStore';
import setLocation from 'server/middleware/setLocation';
import setCountrySubdomain from 'server/middleware/setCountrySubdomain';
import setLanguage from 'server/middleware/setLanguage';
import setIsBot from 'server/middleware/setIsBot';

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

if (env.firebaseProject === 'pesposa-dev') {
  server.use(morgan('combined'));
}

// Default route
server.get(
  '/*',
  redirectLegacyUrl,
  createStore,
  setLocation,
  setCountrySubdomain,
  setLanguage,
  setIsBot,
  appRoute,
);

export default server;
