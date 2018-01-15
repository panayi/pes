import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import * as firebase from 'firebase';
import * as modelPaths from 'constants/modelPaths';
import * as firebaseConstants from 'constants/firebase';
import * as storageConstants from 'constants/storage';
import { actions as authActions } from './auth';
import { utils as userUtils } from './user';
import makeRootReducer from './reducers';

const firebaseConfig = {
  apiKey: firebaseConstants.FIREBASE_API_KEY,
  authDomain: firebaseConstants.FIREBASE_DOMAIN,
  databaseURL: firebaseConstants.FIREBASE_DATABASE_URL,
  storageBucket: storageConstants.BUCKET,
};

export default (initialState = {}) => {
  // Create a history of your choosing (we're using a browser history in this case)
  const history = createHistory();

  const reduxFirebaseConfig = {
    userProfile: modelPaths.USERS.string,
    profileFactory: userUtils.profileFactory,
    onAuthStateChanged: authActions.handleAuthStateChanged,
  };

  // initialize firebase instance
  firebase.initializeApp(firebaseConfig);

  // Middleware Configuration
  const middleware = [
    routerMiddleware(history),
    thunk.withExtraArgument(getFirebase),
  ];

  // Store Enhancers
  const enhancers = [];
  let composeEnhancers = compose;

  // FIXME: this should only be on DEV environment
  /* eslint-disable no-underscore-dangle */
  if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  }
  /* eslint-enable no-underscore-dangle */

  // Store Instantiation and HMR Setup
  const store = createStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      reactReduxFirebase(firebase, reduxFirebaseConfig),
      ...enhancers,
    ),
  );

  store.asyncReducers = {};

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default; // eslint-disable-line global-require
      store.replaceReducer(reducers(store.asyncReducers));
    });
  }

  store.history = history;

  return store;
};
