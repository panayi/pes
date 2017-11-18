import { combineReducers } from 'redux';
import linkedAccountsReducer from './linkedAccounts';
import anonymousUserIdReducer from './anonymousUserId';
import withPhoneNumberReducer from './withPhoneNumber';

export default combineReducers({
  anonymousUserId: anonymousUserIdReducer,
  linkedAccounts: linkedAccountsReducer,
  withPhoneNumber: withPhoneNumberReducer,
});
