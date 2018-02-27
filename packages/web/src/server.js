import express from 'express';
import * as R from 'ramda';
import session from 'express-session';
import createFileStore from 'session-file-store';
import bodyParser from 'body-parser';
import firebase from 'firebase-admin';
import createMemoryHistory from 'history/createMemoryHistory';
import { render } from '@jaredpalmer/after';
import * as firebaseConfig from '@pesposa/core/src/config/firebase';
import serviceAccountKey from '@pesposa/core/src/config/serviceAccountKey.json';
import configureStore from 'store/configureStore';
import routes from './routes';
import Document from './Document';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST); // eslint-disable-line import/no-dynamic-require
const FileStore = createFileStore(session);
const jsonParser = bodyParser.json();

if (!firebase.apps.length) {
  firebase.initializeApp({
    databaseURL: firebaseConfig.FIREBASE_DATABASE_URL,
    credential: firebase.credential.cert(serviceAccountKey),
  });
}

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .use(
    session({
      secret: 'geheimnis',
      saveUninitialized: true,
      store: new FileStore({ path: '/tmp/sessions', secret: 'geheimnis' }),
      resave: false,
      rolling: true,
      httpOnly: true,
      cookie: { maxAge: 604800000 }, // week
    }),
  )
  .post('/_token', jsonParser, async (req, res) => {
    const { token } = req.body;
    firebase
      .auth()
      .verifyIdToken(token)
      .then(decodedToken => {
        req.session.decodedToken = decodedToken;
        return decodedToken;
      })
      .then(decodedToken => res.json({ status: true, decodedToken }))
      .catch(error => res.json({ error }));
  })
  .delete('/_token', async (req, res) => {
    req.session.decodedToken = null;
    res.json({ status: true });
  })
  .get('/*', async (req, res) => {
    try {
      const store = configureStore({}, createMemoryHistory());

      // Sign-in user using session
      const userId = R.path(['session', 'decodedToken', 'user_id'], req);
      if (userId) {
        await firebase
          .auth()
          .createCustomToken(req.session.decodedToken.user_id)
          .then(token => store.firebase.auth().signInWithCustomToken(token));
      }

      const docGetInitialProps = Document.getInitialProps;
      Document.getInitialProps = ctx => docGetInitialProps({ ...ctx, store });

      const html = await render({
        req,
        res,
        document: Document,
        routes,
        assets,
        store,
        customThing: 'thing',
      });
      res.send(html);
    } catch (error) {
      res.json(error);
    }
  });

export default server;
