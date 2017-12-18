import { combineReducers } from 'redux';
import { combineForms } from 'react-redux-form';
import { routerReducer } from 'react-router-redux';
import { firebaseStateReducer } from 'react-redux-firebase';
import authReducer from './auth';
import modalsReducer from './modals';
import formsReducer from './forms';
import adReducer from './ad';

export const makeRootReducer = asyncReducers =>
  combineReducers({
    router: routerReducer,
    firebase: firebaseStateReducer,
    forms: combineForms(formsReducer, 'forms'),
    auth: authReducer,
    modals: modalsReducer,
    ad: adReducer,
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
