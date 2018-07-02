import * as functions from 'firebase-functions';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import createCors from 'cors';
import env from '@pesposa/core/src/config/env';
import { isAuthenticated } from './utils';
import reverseGeocode from './reverseGeocode';
import geoip from './geoip';
import migrateAnonymousUser from './migrateAnonymousUser';
import setUserInfo from './setUserInfo';
import sendNotifications from './sendNotifications';
import generateSitemap from './generateSitemap';

const app = express();

if (env.firebaseProject === 'pesposa-develop') {
  app.use(
    morgan('combined', {
      stream: {
        write: console.log, // eslint-disable-line no-console
      },
    }),
  );
}

const origin =
  env.firebaseProject === 'pesposa-develop' ? '*' : /pesposa\.com$/;
const cors = createCors({ credentials: true, origin });
app.use(cors);

// Public routes
app.post('/reverse-geocode', bodyParser.json(), reverseGeocode);
app.post('/geoip', bodyParser.json(), geoip);

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

app.post('/users/info', isAuthenticated(), setUserInfo);

app.get('/send-notifications', sendNotifications);

app.get('/sitemap.xml', generateSitemap);

export default functions.https.onRequest(app);
