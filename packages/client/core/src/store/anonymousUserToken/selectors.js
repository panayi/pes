import * as R from 'ramda';
import * as constants from './constants';

// anonymousUserTokenSelector :: State -> Object | Nil
export const anonymousUserTokenSelector = R.prop(constants.ROOT_KEY);
