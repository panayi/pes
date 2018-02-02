import * as R from 'ramda';
import * as constants from './constants';

// linkedProvidersSelector :: State -> [String]
export const linkedProvidersSelector = R.pathOr(
  [],
  constants.LINKED_ACCOUNTS_PATH,
);
