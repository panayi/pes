import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'react-redux-firebase';
import { reducer as responsiveReducer } from 'react-responsive-redux';
import linkedProvidersReducer, {
  constants as linkedProvidersConstants,
} from './linkedProviders';
import anonymousUserTokenReducer, {
  constants as anonymousUserConstants,
} from './anonymousUserToken';
import userInfoReducer, { constants as userInfoConstants } from './userInfo';
import chatReducer, { constants as chatConstants } from './chat';
import loginReducer, { constants as loginConstants } from './login';
import modalsReducer, { constants as modalConstants } from './modals';
import siteReducer, { constants as siteConstants } from './site';
import { constants as responsiveConstants } from './responsive';
import postAdReducer from './postAd';
import searchReducers from './search';

export const makeRootReducer = asyncReducers =>
  combineReducers({
    firebase: firebaseStateReducer,
    [responsiveConstants.ROOT_KEY]: responsiveReducer,
    [anonymousUserConstants.ROOT_KEY]: anonymousUserTokenReducer,
    [userInfoConstants.ROOT_KEY]: userInfoReducer,
    [linkedProvidersConstants.ROOT_KEY]: linkedProvidersReducer,
    [chatConstants.ROOT_KEY]: chatReducer,
    [loginConstants.ROOT_KEY]: loginReducer,
    [modalConstants.ROOT_KEY]: modalsReducer,
    [siteConstants.ROOT_KEY]: siteReducer,
    postAd: postAdReducer,
    ...searchReducers,
    ...asyncReducers,
  });

// TODO: remove this
export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) {
    return;
  }

  store.asyncReducers[key] = reducer; // eslint-disable-line no-param-reassign
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
