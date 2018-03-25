import express from 'express';
import session from 'express-session';
import createFileStore from 'session-file-store';
import bodyParser from 'body-parser';
import firebase from 'firebase-admin';
import env from '@pesposa/core/src/config/env';
import serviceAccountKey from '@pesposa/core/src/config/serviceAccountKey.json';
import appRoute from 'server/routes/app';
import {
  createToken as createTokenRoute,
  deleteToken as deleteTokenRoute,
} from 'server/routes/token';
import createStore from 'server/middleware/createStore';
import needsBetaEnabled from 'server/middleware/needsBetaEnabled';
import requireBetaUser from 'server/middleware/requireBetaUser';
import requireNonBetaUser from 'server/middleware/requireNonBetaUser';
import signIn from 'server/middleware/signIn';
import setLocation from 'server/middleware/setLocation';
import setLanguage from 'server/middleware/setLanguage';

const FileStore = createFileStore(session);
const jsonParser = bodyParser.json();

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
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .use(
    session({
      secret: 'geheimnis', // TODO: this should be an env variable
      saveUninitialized: true,
      store: new FileStore({ path: '/tmp/sessions', secret: 'geheimnis' }), // TODO: this should be an env variable
      resave: false,
      rolling: true,
      httpOnly: true,
      cookie: { maxAge: 604800000 }, // week
    }),
  );

// Token routes
server.post('/token', jsonParser, createTokenRoute);
server.delete('/token', deleteTokenRoute);

// Beta route
server.get(
  '/beta',
  needsBetaEnabled,
  createStore,
  signIn,
  requireNonBetaUser,
  appRoute,
);

// Default route
server.get(
  '/*',
  createStore,
  signIn,
  requireBetaUser,
  setLocation,
  setLanguage,
  appRoute,
);

export default server;
