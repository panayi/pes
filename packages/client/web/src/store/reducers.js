import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'react-redux-firebase';
import { reducer as responsiveReducer } from 'react-responsive-redux';
import anonymousUserTokenReducer, {
  constants as anonymousUserConstants,
} from '@pesposa/client-core/src/store/anonymousUserToken';
import userInfoReducer, {
  constants as userInfoConstants,
} from '@pesposa/client-core/src/store/userInfo';
import loginReducer, {
  constants as loginConstants,
} from '@pesposa/client-core/src/store/login';
import modalsReducer, {
  constants as modalConstants,
} from '@pesposa/client-core/src/store/modals';
import siteReducer, {
  constants as siteConstants,
} from '@pesposa/client-core/src/store/site';
import { constants as responsiveConstants } from '@pesposa/client-core/src/store/responsive';
import postAdReducer, {
  constants as postAdConstants,
} from '@pesposa/client-core/src/store/postAd';
import searchReducers from '@pesposa/client-core/src/store/search';
import linkedProvidersReducer, {
  constants as linkedProvidersConstants,
} from './linkedProviders';
import chatReducer, { constants as chatConstants } from './chat';

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
    [postAdConstants.ROOT_KEY]: postAdReducer,
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
