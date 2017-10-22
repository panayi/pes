import { combineReducers } from 'redux';
import linkedAccountsReducer from './linkedAccounts';
import anonymousProfileReducer from './anonymousProfile';
import withPhoneNumberReducer from './withPhoneNumber';

export default combineReducers({
  anonymousProfile: anonymousProfileReducer,
  linkedAccounts: linkedAccountsReducer,
  withPhoneNumber: withPhoneNumberReducer,
});
