import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import * as firebase from 'firebase';
import * as storageConfig from '@pesposa/core/src/config/storage';
import env from '@pesposa/core/src/config/env';
import * as modelPaths from '@pesposa/core/src/config/modelPaths';
import { actions as authActions } from './firebase/auth';
import {
  utils as profileUtils,
  constants as profileConstants,
} from './firebase/profile';
import makeRootReducer from './reducers';

const configureStore = (initialState = {}, history) => {
  const firebaseAppConfig = {
    apiKey: env.firebaseApiKey,
    authDomain: env.firebaseDomain,
    databaseURL: env.firebaseDatabaseUrl,
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
  const middleware = [thunk.withExtraArgument(getFirebase)];

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
