import * as functions from 'firebase-functions';
import express from 'express';
import createCors from 'cors';
import authenticate from './authenticate';
import saveUserIp from './saveUserIp';
import syncLegacyAd from './syncLegacyAd';

const app = express();

// TODO: should restrict origin
// and perhaps enable only on DEV environment
const cors = createCors({ credentials: true, origin: '*' });

// Public routes
app.get('/:category/:id', syncLegacyAd);

// Protected routes
app.use(cors);
app.use(authenticate);

app.post('/users/:userId/ip', saveUserIp);

export default functions.https.onRequest(app);
