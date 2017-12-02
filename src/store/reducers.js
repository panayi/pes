import { combineReducers } from 'redux';
import { combineForms } from 'react-redux-form';
import { routerReducer } from 'react-router-redux';
import { firebaseStateReducer } from 'react-redux-firebase';
import authReducer from './auth';
import modalsReducer from './modals';
import forms from './forms';

export const makeRootReducer = asyncReducers =>
  combineReducers({
    router: routerReducer,
    firebase: firebaseStateReducer,
    forms: combineForms(forms, 'forms'),
    auth: authReducer,
    modals: modalsReducer,
    ...asyncReducers,
  });

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) {
    return;
  }

  store.asyncReducers[key] = reducer; // eslint-disable-line no-param-reassign
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
