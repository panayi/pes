import * as R from 'ramda';

// anonymousUserIdSelector :: State -> Object | Nil
export const anonymousUserIdSelector = R.path(['auth', 'anonymousUserId']);
