/* @flow */
import * as R from 'ramda';
import * as functions from 'firebase-functions';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import createCors from 'cors';
import log from '@pesposa/core/src/utils/log';
import * as respond from '@pesposa/core/src/utils/respond';
import env from '@pesposa/core/src/config/env';
import { isAuthenticated } from './utils';
import reverseGeocode from './reverseGeocode';
import geoip from './geoip';
import migrateAnonymousUser from './migrateAnonymousUser';
import setUserInfo from './setUserInfo';
import confirmAddToWaitlist from './confirmAddToWaitlist';
import createBetaInvite from './createBetaInvite';
import createBetaUser from './createBetaUser';
import createBetaCodeAndUser from './createBetaCodeAndUser';
import sendNotifications from './sendNotifications';

const app = express();

if (env.firebaseProject === 'pesposa-dev') {
  app.use(
    morgan('combined', {
      stream: {
        write: console.log, // eslint-disable-line no-console
      },
    }),
  );
}

const origin = env.firebaseProject === 'pesposa-dev' ? '*' : /pesposa\.com$/;
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

app.post('/waitlisted/callback', bodyParser.json(), async (req, res) => {
  const event = R.prop('event', req.body);
  if (event === 'reservation_created') {
    return confirmAddToWaitlist(req, res);
  }

  if (event === 'reservation_activated') {
    return createBetaInvite(req, res);
  }

  log.error('Unhandled Waitlisted event', event, req.body);
  respond.internalServerError(res);
  return null;
});

app.post('/beta-users', isAuthenticated(), bodyParser.json(), createBetaUser);

app.post('/beta', isAuthenticated(), createBetaCodeAndUser);

export default functions.https.onRequest(app);
