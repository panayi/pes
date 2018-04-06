import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import createHistory from 'history/createBrowserHistory';
import * as firebase from 'firebase';
import 'firebase/functions';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import * as modelPaths from '@pesposa/core/src/config/modelPaths';
import firebaseConfig from '@pesposa/client-core/src/config/firebase';
import { utils as profileUtils } from '@pesposa/client-core/src/store/firebase/profile';
import { utils as storageUtils } from '@pesposa/client-core/src/store/firebase/storage';
import reducer from './reducers';

const configureStore = (initialState = {}) => {
  const reduxFirebaseConfig = {
    userProfile: modelPaths.USERS.string,
    profileFactory: profileUtils.profileFactory,
    fileMetadataFactory: storageUtils.fileMetadataFactory,
  };

  // Create browser history
  const history = createHistory();

  // Middleware configuration
  const middleware = [thunk.withExtraArgument(getFirebase)];

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  firebase.functions();

  // Store Enhancers
  const enhancers = [reactReduxFirebase(firebase, reduxFirebaseConfig)];
  const composeEnhancers = composeWithDevTools;

  // Store instantiation
  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(...enhancers, applyMiddleware(...middleware)),
  );

  store.history = history;

  return store;
};

export default configureStore;
