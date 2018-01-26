import { combineReducers } from 'redux';
import { combineForms } from 'react-redux-form';
import { routerReducer } from 'react-router-redux';
import { firebaseStateReducer } from 'react-redux-firebase';
import linkedAccountsReducer from './linkedAccounts';
import anonymousUserTokenReducer, {
  constants as anonymousUserConstants,
} from './anonymousUserToken';
import loginReducer, { constants as loginConstants } from './login';
import modalsReducer from './modals';
import formsReducer from './forms';
import postAdReducer from './postAd';
import filterAdsReducer from './filterAds';

export const makeRootReducer = asyncReducers =>
  combineReducers({
    router: routerReducer,
    firebase: firebaseStateReducer,
    forms: combineForms(formsReducer, 'forms'),
    [anonymousUserConstants.ANONYMOUS_USER_TOKEN_KEY]: anonymousUserTokenReducer,
    linkedAccounts: linkedAccountsReducer,
    [loginConstants.ROOT_KEY]: loginReducer,
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
