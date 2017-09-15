import { combineReducers } from 'redux';
import { combineForms } from 'react-redux-form';
import { routerReducer } from 'react-router-redux';
import { firebaseStateReducer } from 'react-redux-firebase';
import forms from './forms';
import authReducer from '../../auth/auth';
import adminReducer from '../../admin/admin';

export const makeRootReducer = asyncReducers =>
  combineReducers({
    router: routerReducer,
    firebase: firebaseStateReducer,
    forms: combineForms(forms, 'forms'),
    auth: authReducer,
    admin: adminReducer,
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
