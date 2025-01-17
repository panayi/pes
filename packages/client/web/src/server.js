import express from 'express';
import firebase from 'firebase-admin';
import useragent from 'express-useragent';
import env from '@pesposa/core/src/config/env';
import serviceAccountKey from '@pesposa/core/src/config/serviceAccountKey.json';
import appRoute from 'server/routes/app';
import robotsTxtRoute from 'server/routes/robots.txt';
import redirectLegacyUrl from 'server/middleware/redirectLegacyUrl';
import createStore from 'server/middleware/createStore';
import setUserInfo from 'server/middleware/setUserInfo';
import setCountrySubdomain from 'server/middleware/setCountrySubdomain';
import checkMaintenance from './server/middleware/checkMaintenance';

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
  .use(express.static(process.env.REACT_APP_PUBLIC_DIR))
  .use(useragent.express())
  .use(checkMaintenance);

server.get(
  '/robots.txt',
  createStore,
  setUserInfo,
  setCountrySubdomain,
  robotsTxtRoute,
);

// Default route
server.get(
  '/*',
  redirectLegacyUrl,
  createStore,
  setUserInfo,
  setCountrySubdomain,
  appRoute,
);

export default server;
