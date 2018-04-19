import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import thunk from 'redux-thunk';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import * as firebase from 'firebase';
import persistState from 'redux-localstorage';
import * as storageConfig from '@pesposa/core/src/config/storage';
import env from '@pesposa/core/src/config/env';
import * as modelPaths from '@pesposa/core/src/config/modelPaths';
import { actions as authActions } from './firebase/auth';
import {
  constants as userInfoConstants,
  utils as userInfoUtils,
} from './userInfo';
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
    preserveOnLogout: [
      'categories',
      'locales',
      'translations',
      'countryFlags',
      'ads',
      'users',
      'betaUsers',
    ],
  };

  // initialize firebase instance
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseAppConfig);
  }

  // Middleware Configuration
  const middleware = [thunk.withExtraArgument(getFirebase)];

  // Store Enhancers
  let enhancers = [reactReduxFirebase(firebase, reduxFirebaseConfig)];
  if (process.browser) {
    enhancers = [
      ...enhancers,
      persistState(userInfoConstants.ROOT_KEY, {
        merge: userInfoUtils.mergeState,
      }),
    ];
  }
  const composeEnhancers = composeWithDevTools;

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
