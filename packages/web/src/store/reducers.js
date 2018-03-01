import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'react-redux-firebase';
import linkedProvidersReducer, {
  constants as linkedProvidersConstants,
} from './linkedProviders';
import anonymousUserTokenReducer, {
  constants as anonymousUserConstants,
} from './anonymousUserToken';
import chatReducer, { constants as chatConstants } from './chat';
import loginReducer, { constants as loginConstants } from './login';
import modalsReducer, { constants as modalConstants } from './modals';
import postAdReducer from './postAd';
import searchReducers from './search';

export const makeRootReducer = asyncReducers =>
  combineReducers({
    firebase: firebaseStateReducer,
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
