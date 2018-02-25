import * as R from 'ramda';
import * as constants from './constants';

// anonymousUserTokenSelector :: State -> Object | Nil
export const anonymousUserTokenSelector = R.prop(
  constants.ANONYMOUS_USER_TOKEN_KEY,
);
