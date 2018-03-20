import express from 'express';
import * as R from 'ramda';
import session from 'express-session';
import createFileStore from 'session-file-store';
import bodyParser from 'body-parser';
import firebase from 'firebase-admin';
import createMemoryHistory from 'history/createMemoryHistory';
import { mobileParser, setMobileDetect } from 'react-responsive-redux';
import { render } from '@jaredpalmer/after';
import env from '@pesposa/core/src/config/env';
import serviceAccountKey from '@pesposa/core/src/config/serviceAccountKey.json';
import configureStore from 'store/configureStore';
import { models } from 'store/firebase/data';
import { BETA_ENABLED, isBetaUserSelector } from 'pages/beta';
import routes from './routes';
import Document from './Document';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST); // eslint-disable-line import/no-dynamic-require
const FileStore = createFileStore(session);
const jsonParser = bodyParser.json();

if (!firebase.apps.length) {
  firebase.initializeApp({
    databaseURL: env.firebaseDatabaseUrl,
    credential: firebase.credential.cert(serviceAccountKey),
  });
}

// BETA
const requireBetaUser = async (req, res, next) => {
  if (!BETA_ENABLED) {
    next();
    return;
  }

  const { store } = req;
  await store.firebase.promiseEvents([models.betaUsers.all.query({})]);
  const isBetaUser = isBetaUserSelector(store.getState());

  if (isBetaUser) {
    next();
    return;
  }

  res.redirect('/beta');
  res.end();
};

const requireNonBetaUser = async (req, res, next) => {
  const { store } = req;
  await store.firebase.promiseEvents([models.betaUsers.all.query({})]);
  const isBetaUser = isBetaUserSelector(store.getState());

  if (isBetaUser) {
    res.redirect('/');
    res.end();
  } else {
    next();
  }
};

const needsBetaEnabled = async (req, res, next) => {
  if (!BETA_ENABLED) {
    res.redirect('/');
    res.end();
  } else {
    next();
  }
};

const setupData = async (req, res, next) => {
  const store = configureStore({}, createMemoryHistory());

  // Sign-in user using session
  const userId = R.path(['session', 'decodedToken', 'user_id'], req);
  if (userId) {
    await firebase
      .auth()
      .createCustomToken(req.session.decodedToken.user_id)
      .then(token => store.firebase.auth().signInWithCustomToken(token));
  }

  req.store = store;
  next();
};

const renderApp = async (req, res) => {
  try {
    const { store } = req;

    // Detect mobile
    const mobileDetect = mobileParser(req);
    store.dispatch(setMobileDetect(mobileDetect));

    const docGetInitialProps = Document.getInitialProps;
    Document.getInitialProps = ctx => docGetInitialProps({ ...ctx, store });

    const html = await render({
      req,
      res,
      document: Document,
      routes,
      assets,
      store,
    });
    res.send(html);
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
    res.json(error);
  }
};

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
  .get('/beta', setupData, needsBetaEnabled, requireNonBetaUser, renderApp) // BETA
  .get('/*', setupData, requireBetaUser, renderApp);

export default server;
