import { createAction } from 'redux-actions';
import * as types from './types';
import { anonymousUserIdSelector } from './selectors';

const reset = createAction(types.RESET);

export const maybeSetAnonymousUserId = () => (dispatch, getState, getFirebase) => {
  const state = getState();
  const anonymousUserId = anonymousUserIdSelector(state);

  if (!anonymousUserId) {
    return;
  }

  // Copy anonymousProfile to logged-in (non-anoymous) user profile
  // Note that this will override keys that already exist in user profile
  getFirebase().updateProfile({ anonymousUserId }).then(() => dispatch(reset()));

  // TODO: Need to also delete the anonymous User and profile
  // No idea how to do that...
};
