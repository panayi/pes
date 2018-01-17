import * as R from 'ramda';
import * as authConstants from '../constants';
import * as constants from './constants';

// anonymousUserTokenSelector :: State -> Object | Nil
export const anonymousUserTokenSelector = R.path([
  authConstants.AUTH_KEY,
  constants.ANONYMOUS_USER_TOKEN_KEY,
]);
