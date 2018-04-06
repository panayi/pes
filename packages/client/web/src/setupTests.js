/* eslint-disable import/no-extraneous-dependencies */
import 'raf/polyfill';
import React from 'react';
import * as R from 'ramda';
import * as Firebase from 'firebase';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {
  reactReduxFirebase,
  firebaseStateReducer,
  getFirebase,
} from 'react-redux-firebase';
import FirebaseServer from 'firebase-server';
import configureMockStore from 'redux-mock-store';
import detectPort from 'detect-port';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import 'jest-enzyme';

// Fail tests on any warning
// console.error = (message) => {
//   throw new Error(message);
// };

// ------------------------------------
// Setup Enzyme
// ------------------------------------

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

// ------------------------------------
// Setup Firebase
// ------------------------------------

global.Firebase = Firebase;

const firebaseConfig = {
  apiKey: 'asdf', // placeholder
  authDomain: 'asdf', // placeholder
  databaseURL: 'ws://127.0.1:5000',
  storageBucket: 'asdf', // placeholder
  messagingSenderId: 'asdf', // placeholder
};

global.firebase = Object.defineProperty(Firebase, '_', {
  value: {
    watchers: {},
    authUid: null,
    config: Object.assign({}, firebaseConfig, {
      userProfile: 'users',
      enableRedirectHandling: false, // disabled due to lack of http/https
    }),
  },
  writable: true,
  enumerable: true,
  configurable: true,
});

// ------------------------------------
// Globals
// ------------------------------------

global.shallow = shallow;
global.mount = mount;
global.R = R;

// ------------------------------------
// Helpers
// ------------------------------------

global.noop = () => {};

const PORT = 5000;

global.startFirebaseTestServer = async () => {
  const port = await detectPort(PORT);

  if (port === PORT) {
    /* eslint-disable no-new */
    new FirebaseServer(PORT, 'localhost.firebaseio.test', {
      users: {
        Iq5b0qK2NtgggT6U3bU6iZRGyma2: {
          name: 'Tester',
        },
      },
    });
    /* eslint-enable no-new */
  }

  Firebase.initializeApp(firebaseConfig);
};

global.withMockStore = (children, state = {}) => {
  const store = configureMockStore(
    compose(
      reactReduxFirebase(Firebase, {
        userProfile: 'users',
        enableRedirectHandling: false,
      }),
      applyMiddleware(thunk.withExtraArgument(getFirebase)),
    ),
  )(state);
  store.firebase = global.firebase;

  return {
    component: <Provider store={store}>{children}</Provider>,
    store,
  };
};

global.withStore = (children, state = {}) => {
  const store = createStore(
    combineReducers({ firebase: firebaseStateReducer }),
    state,
    compose(
      reactReduxFirebase(Firebase, {
        userProfile: 'users',
        enableRedirectHandling: false,
      }),
      applyMiddleware(thunk.withExtraArgument(getFirebase)),
    ),
  );

  return {
    component: <Provider store={store}>{children}</Provider>,
    store,
  };
};
