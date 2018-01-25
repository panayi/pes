import { combineReducers } from 'redux';
import linkedAccountsReducer from './linkedAccounts';
import anonymousUserTokenReducer, {
  constants as anonymousUserConstants,
} from './anonymousUserToken';

export default combineReducers({
  [anonymousUserConstants.ANONYMOUS_USER_TOKEN_KEY]: anonymousUserTokenReducer,
  linkedAccounts: linkedAccountsReducer,
});
