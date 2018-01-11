import { combineReducers } from 'redux';
import { combineForms } from 'react-redux-form';
import { routerReducer } from 'react-router-redux';
import { firebaseStateReducer } from 'react-redux-firebase';
import authReducer from './auth';
import i18nReducer from './i18n';
import modalsReducer from './modals';
import formsReducer from './forms';
import postAdReducer from './postAd';
import filterAdsReducer from './filterAds';

export const makeRootReducer = asyncReducers =>
  combineReducers({
    router: routerReducer,
    firebase: firebaseStateReducer,
    forms: combineForms(formsReducer, 'forms'),
    auth: authReducer,
    i18n: i18nReducer,
    modals: modalsReducer,
    postAd: postAdReducer,
    filterAds: filterAdsReducer,
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
