import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import thunk from 'redux-thunk';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import * as firebase from 'firebase';
import 'firebase/functions';
import persistState from 'redux-localstorage';
import * as modelPaths from '@pesposa/core/src/config/modelPaths';
import firebaseConfig from '@pesposa/client-core/src/config/firebase';
import { actions as authActions } from '@pesposa/client-core/src/store/firebase/auth';
import {
  constants as userInfoConstants,
  utils as userInfoUtils,
} from '@pesposa/client-core/src/store/userInfo';
import { utils as profileUtils } from '@pesposa/client-core/src/store/firebase/profile';
import { utils as storageUtils } from '@pesposa/client-core/src/store/firebase/storage';
import makeRootReducer from './reducers';

const configureStore = (initialState = {}, history) => {
  const reduxFirebaseConfig = {
    userProfile: modelPaths.USERS.string,
    profileFactory: profileUtils.profileFactory,
    fileMetadataFactory: storageUtils.fileMetadataFactory,
    onAuthStateChanged: authActions.handleAuthStateChanged,
    enableEmptyAuthChanges: true,
    preserveOnLogout: [
      'categories',
      'locales',
      'translations',
      'countryFlags',
      'ads',
      'users',
    ],
    preserveOnEmptyAuthChange: {},
  };

  // initialize firebase instance
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  firebase.functions();

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

  store.history = history;

  return store;
};

export default configureStore;
