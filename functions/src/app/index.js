/* eslint-disable no-console */
import express from 'express';
import createCors from 'cors';
import { auth, database } from '../lib/firebase';
import firebaseInitialize from './firebase/initialize';
import algoliaInitialize from './algolia/initialize';

const app = express();
const cors = createCors({ credentials: true, origin: '*' });

// Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
// The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header
// like this:
// `Authorization: Bearer <Firebase ID Token>`.
// when decoded successfully, the ID Token content will be added as `req.user`.
const validateFirebaseIdToken = (req, res, next) => {
  console.log('Check if request is authorized with Firebase ID token');

  if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer '))) {
    console.error(
      'No Firebase ID token was passed as a Bearer token in the Authorization header.',
      'Make sure you authorize your request by providing the following HTTP header:',
      'Authorization: Bearer <Firebase ID Token>',
      'or by passing a "__session" cookie.',
    );
    res.status(403).send('Unauthorized');
    return;
  }

  let idToken;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    console.log('Found "Authorization" header');
    // Read the ID Token from the Authorization header.
    idToken = req.headers.authorization.split('Bearer ')[1];
  }

  auth.verifyIdToken(idToken).then((decodedIdToken) => {
    console.log(`Authenticated with id = ${decodedIdToken.user_id}`);
    const userRef = database.ref(`users/${decodedIdToken.user_id}`);

    userRef.on('value', (snapshot) => {
      const user = snapshot.val();
      if (user.roles && user.roles.admin) {
        req.user = decodedIdToken;
        next();
      } else {
        throw new Error('Unauthorized');
      }
    }, (errorObject) => {
      throw new Error(errorObject);
    });
  }).catch((error) => {
    console.error('Error while verifying Firebase ID token:', error);
    res.status(403).send('Unauthorized');
  });
};

app.use(cors);
app.use(validateFirebaseIdToken);

app.get('firebase/initialize', firebaseInitialize);
app.get('/algolia/initialize', algoliaInitialize);

export default app;
