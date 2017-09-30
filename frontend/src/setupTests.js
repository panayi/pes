/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import * as Firebase from 'firebase';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { reactReduxFirebase, firebaseStateReducer, getFirebase } from 'react-redux-firebase';
import FirebaseServer from 'firebase-server';
import configureMockStore from 'redux-mock-store';
import detectPort from 'detect-port';
import 'jest-enzyme';

global.noop = () => {};

// ------------------------------------
// Setup store and Firebase
// ------------------------------------

global.Firebase = Firebase;

const firebaseConfig = {
  apiKey: 'asdf', // placeholder
  authDomain: 'asdf', // placeholder
  databaseURL: 'ws://127.0.1:5000',
  storageBucket: 'asdf', // placeholder
  messagingSenderId: 'asdf', // placeholder
};

detectPort(5000)
  .then((port) => {
    if (port === 5000) {
      new FirebaseServer(5000, 'localhost.firebaseio.test', { // eslint-disable-line no-new
        users: {
          Iq5b0qK2NtgggT6U3bU6iZRGyma2: {
            displayName: 'Tester',
          },
        },
      });
    }

    // Swallow firebase reinitialize error (useful when using watch)
    try {
      Firebase.initializeApp(firebaseConfig);
    } catch (err) {
      // do nothing
    }
  });


global.firebase = Object.defineProperty(Firebase, '_', {
  value: {
    watchers: {},
    authUid: null,
    config: Object.assign(
      {},
      firebaseConfig,
      {
        userProfile: 'users',
        enableRedirectHandling: false, // disabled due to lack of http/https
      },
    ),
  },
  writable: true,
  enumerable: true,
  configurable: true,
});

// ------------------------------------
// Helpers
// ------------------------------------

global.withMockStore = (children, state = {}) => {
  const store = configureMockStore(compose(
    reactReduxFirebase(Firebase, { userProfile: 'users', enableRedirectHandling: false }),
    applyMiddleware(thunk.withExtraArgument(getFirebase)),
  ))(state);
  store.firebase = global.firebase;

  return {
    component: (
      <Provider store={store}>
        {children}
      </Provider>
    ),
    store,
  };
};

global.withStore = (children, state = {}) => {
  const store = createStore(
    combineReducers({ firebase: firebaseStateReducer }),
    state,
    compose(
      reactReduxFirebase(Firebase, { userProfile: 'users', enableRedirectHandling: false }),
      applyMiddleware(thunk.withExtraArgument(getFirebase)),
    ),
  );

  return {
    component: (
      <Provider store={store}>
        {children}
      </Provider>
    ),
    store,
  };
};
