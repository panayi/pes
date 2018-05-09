import express from 'express';
import firebase from 'firebase-admin';
import env from '@pesposa/core/src/config/env';
import serviceAccountKey from '@pesposa/core/src/config/serviceAccountKey.json';
import appRoute from 'server/routes/app';
import redirectLegacyUrl from 'server/middleware/redirectLegacyUrl';
import createStore from 'server/middleware/createStore';
import setUserInfo from 'server/middleware/setUserInfo';
import setCountrySubdomain from 'server/middleware/setCountrySubdomain';

// Create Firebase app
if (!firebase.apps.length) {
  firebase.initializeApp({
    databaseURL: env.firebaseDatabaseUrl,
    credential: firebase.credential.cert(serviceAccountKey),
  });
}

const server = express();

try {
  // Application-level Middleware
  server
    .disable('x-powered-by')
    .use(express.static(process.env.RAZZLE_PUBLIC_DIR));

  // Default route
  server.get(
    '/*',
    redirectLegacyUrl,
    createStore,
    setUserInfo,
    setCountrySubdomain,
    appRoute,
  );
} catch (error) {
  console.error(error);
}

export default server;
