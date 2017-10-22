import * as R from 'ramda';

// anonymousProfileSelector :: State -> Object | Nil
export const anonymousProfileSelector = R.path(['auth', 'anonymousProfile']);
