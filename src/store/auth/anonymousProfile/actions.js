import { createAction } from 'redux-actions';
import * as types from './types';
import { anonymousProfileSelector } from './selectors';

const reset = createAction(types.RESET);

export const maybeMergeAnonymousProfile = () => (dispatch, getState, getFirebase) => {
  const state = getState();
  const anonymousProfile = anonymousProfileSelector(state);

  if (!anonymousProfile) {
    return;
  }

  // Copy anonymousProfile to logged-in (non-anoymous) user profile
  // Note that this will override keys that already exist in user profile
  getFirebase().updateProfile(anonymousProfile).then(() => dispatch(reset()));

  // TODO: Need to also delete the anonymous User and profile
  // No idea how to do that...
};
