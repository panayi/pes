/* @flow */
import * as functions from 'firebase-functions';
import express from 'express';
import createCors from 'cors';
import env from '@pesposa/core/src/config/env';
import { isAuthenticated } from './utils';
import reverseGeocode from './reverseGeocode';
import geoip from './geoip';
import migrateAnonymousUser from './migrateAnonymousUser';

const app = express();

if (env.firebaseProject === 'pesposa-dev') {
  const cors = createCors({ credentials: true, origin: '*' });
  app.use(cors);
}

// Public routes
app.post(
  '/reverse-geocode',
  reverseGeocode
)
app.post(
  '/geoip',
  geoip
)

// Protected routes
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
