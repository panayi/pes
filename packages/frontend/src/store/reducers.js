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
import chatReducer, { constants as chatConstants } from './chat';
import loginReducer, { constants as loginConstants } from './login';
import modalsReducer, { constants as modalConstants } from './modals';
import formsReducer from './forms';
import postAdReducer from './postAd';
import searchReducers from './search';

export const makeRootReducer = asyncReducers =>
  combineReducers({
    [routerConstants.ROOT_KEY]: routerReducer,
    firebase: firebaseStateReducer,
    forms: combineForms(formsReducer, 'forms'),
    [anonymousUserConstants.ANONYMOUS_USER_TOKEN_KEY]: anonymousUserTokenReducer,
    [linkedProvidersConstants.ROOT_KEY]: linkedProvidersReducer,
    [chatConstants.ROOT_KEY]: chatReducer,
    [loginConstants.ROOT_KEY]: loginReducer,
    [modalConstants.ROOT_KEY]: modalsReducer,
    postAd: postAdReducer,
    ...searchReducers,
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
