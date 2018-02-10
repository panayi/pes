import { combineReducers } from 'redux';
import { combineForms } from 'react-redux-form';
import { firebaseStateReducer } from 'react-redux-firebase';
import routerReducer, { constants as routerConstants } from './router';
import linkedProvidersReducer, {
  constants as linkedProvidersConstants,
} from './linkedProviders';
import anonymousUserTokenReducer, {
  constants as anonymousUserConstants,
} from './anonymousUserToken';
import loginReducer, { constants as loginConstants } from './login';
import modalsReducer from './modals';
import formsReducer from './forms';
import postAdReducer from './postAd';
import searchReducer, { constants as searchConstants } from './search';

export const makeRootReducer = asyncReducers =>
  combineReducers({
    [routerConstants.ROOT_KEY]: routerReducer,
    firebase: firebaseStateReducer,
    forms: combineForms(formsReducer, 'forms'),
    [anonymousUserConstants.ANONYMOUS_USER_TOKEN_KEY]: anonymousUserTokenReducer,
    [linkedProvidersConstants.ROOT_KEY]: linkedProvidersReducer,
    [loginConstants.ROOT_KEY]: loginReducer,
    modals: modalsReducer,
    postAd: postAdReducer,
    [searchConstants.ROOT_KEY]: searchReducer,
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
