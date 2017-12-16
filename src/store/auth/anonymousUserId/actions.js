import { createAction } from 'redux-actions';
import * as types from './types';
import { anonymousUserIdSelector } from './selectors';

const reset = createAction(types.RESET);

export const maybeSetAnonymousUserId = () => (
  dispatch,
  getState,
  getFirebase,
) => {
  const state = getState();
  const anonymousUserId = anonymousUserIdSelector(state);

  if (!anonymousUserId) {
    return Promise.resolve();
  }

  return getFirebase()
    .updateProfile({ anonymousUserId })
    .then(() => dispatch(reset()));
};
