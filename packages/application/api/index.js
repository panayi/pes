/* @flow */
import * as functions from 'firebase-functions';
import express from 'express';
import bodyParser from 'body-parser';
import createCors from 'cors';
import { isAuthenticated } from './utils';
import setCurrentUserInfo from './setCurrentUserInfo';
import migrateAnonymousUser from './migrateAnonymousUser';

const app = express();
const jsonParser = bodyParser.json();

// TODO: should restrict origin
// and perhaps enable only on DEV environment
const cors = createCors({ credentials: true, origin: '*' });

// Public routes

// Protected routes
app.use(cors);
app.post(
  '/users/current/info',
  isAuthenticated(),
  jsonParser,
  setCurrentUserInfo,
);
app.post(
  '/users/migrate',
  isAuthenticated(),
  isAuthenticated({
    headerKey: 'anonymous-authorization',
    propKey: 'anonymousUser',
  }),
  migrateAnonymousUser,
);

export default functions.https.onRequest(app);
