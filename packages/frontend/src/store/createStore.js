import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import * as firebase from 'firebase';
import {
  modelPaths,
  firebase as firebasConfig,
  storage as storageConfig,
} from 'pesposa-config';
import { actions as authActions } from './firebase/auth';
import {
  utils as profileUtils,
  constants as profileConstants,
} from './firebase/profile';
import makeRootReducer from './reducers';

const firebaseAppConfig = {
  apiKey: firebasConfig.FIREBASE_API_KEY,
  authDomain: firebasConfig.FIREBASE_DOMAIN,
  databaseURL: firebasConfig.FIREBASE_DATABASE_URL,
  storageBucket: storageConfig.BUCKET,
};

export default (initialState = {}) => {
  // Create a history of your choosing (we're using a browser history in this case)
  const history = createHistory();

  const reduxFirebaseConfig = {
    userProfile: modelPaths.USERS.string,
    profileParamsToPopulate: profileConstants.PROFILE_POPULATES,
    profileFactory: profileUtils.profileFactory,
    onAuthStateChanged: authActions.handleAuthStateChanged,
    preserveOnLogout: ['categories', 'locales', 'translations', 'countries'],
  };

  // initialize firebase instance
  firebase.initializeApp(firebaseAppConfig);

  // Middleware Configuration
  const middleware = [
    routerMiddleware(history),
    thunk.withExtraArgument(getFirebase),
  ];

  // Store Enhancers
  const enhancers = [reactReduxFirebase(firebase, reduxFirebaseConfig)];
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
    composeEnhancers(...enhancers, applyMiddleware(...middleware)),
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
