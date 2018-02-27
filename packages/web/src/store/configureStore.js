import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import * as firebase from 'firebase';
import * as storageConfig from '@pesposa/core/src/config/storage';
import * as firebaseConfig from '@pesposa/core/src/config/firebase';
import env from '@pesposa/core/src/config/env';
import * as modelPaths from '@pesposa/core/src/config/modelPaths';
import { actions as authActions } from './firebase/auth';
import {
  utils as profileUtils,
  constants as profileConstants,
} from './firebase/profile';
import { middleware as searchMiddleware } from './search';
import makeRootReducer from './reducers';

const configureStore = (initialState = {}, history) => {
  const firebaseAppConfig = {
    apiKey: env.firebaseApiKey,
    authDomain: firebaseConfig.FIREBASE_DOMAIN,
    databaseURL: firebaseConfig.FIREBASE_DATABASE_URL,
    storageBucket: storageConfig.BUCKET,
  };

  const reduxFirebaseConfig = {
    userProfile: modelPaths.USERS.string,
    profileParamsToPopulate: profileConstants.PROFILE_POPULATES,
    profileFactory: profileUtils.profileFactory,
    onAuthStateChanged: authActions.handleAuthStateChanged,
    preserveOnLogout: ['categories', 'locales', 'translations', 'countries'],
  };

  // initialize firebase instance
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseAppConfig);
  }

  // Middleware Configuration
  const middleware = [
    routerMiddleware(history),
    thunk.withExtraArgument(getFirebase),
    searchMiddleware,
  ];

  // Store Enhancers
  const enhancers = [reactReduxFirebase(firebase, reduxFirebaseConfig)];
  let composeEnhancers = compose;

  // FIXME: this should only be on DEV environment
  /* eslint-disable no-underscore-dangle */
  if (typeof global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
    composeEnhancers = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  }
  /* eslint-enable no-underscore-dangle */

  // Store Instantiation and HMR Setup
  const store = createStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(...enhancers, applyMiddleware(...middleware)),
  );

  // store.asyncReducers = {};

  // if (module.hot) {
  //   module.hot.accept('./reducers', () => {
  //     const reducers = require('./reducers').default; // eslint-disable-line global-require
  //     store.replaceReducer(reducers(store.asyncReducers));
  //   });
  // }

  store.history = history;

  return store;
};

export default configureStore;
