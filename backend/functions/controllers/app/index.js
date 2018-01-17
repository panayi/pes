import * as functions from 'firebase-functions';
import express from 'express';
import createCors from 'cors';
import { isAuthenticated } from './utils';
import saveCurrentUserIp from './saveCurrentUserIp';
import syncLegacyAd from './syncLegacyAd';
import migrateAnonymousUser from './migrateAnonymousUser';

const app = express();

// TODO: should restrict origin
// and perhaps enable only on DEV environment
const cors = createCors({ credentials: true, origin: '*' });

// Public routes
app.get('/:category/:id', syncLegacyAd);

// Protected routes
app.use(cors);
app.post('/users/ip', isAuthenticated(), saveCurrentUserIp);
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
