import * as R from 'ramda';

// linkedAccountsSelector :: State -> Array | Nil
export const linkedAccountsSelector = R.path(['auth', 'linkedAccounts']);
