import { createAction } from 'redux-actions';
import api from 'services/api';
import * as types from './types';
import { anonymousUserIdSelector } from './selectors';

const reset = createAction(types.RESET);

export const maybeSetAnonymousUserId = () => (dispatch, getState) => {
  const state = getState();
  const anonymousUserId = anonymousUserIdSelector(state);

  if (!anonymousUserId) {
    return Promise.resolve();
  }

  return dispatch(api.profile.update({ anonymousUserId })).then(() =>
    dispatch(reset()),
  );
};
