import { createAction } from 'redux-actions';
import api from 'services/api';
import { selectors as authSelectors } from 'store/auth';
import * as types from './types';
import { anonymousUserIdSelector } from './selectors';

const reset = createAction(types.RESET);

export const maybeSetAnonymousUserId = () => (dispatch, getState) => {
  const state = getState();
  const currentUserIsAnonymous = authSelectors.isAnonymousSelector(state);

  if (currentUserIsAnonymous) {
    return Promise.reject(
      'Can not associate anonymous user to another anonymous user',
    );
  }

  const anonymousUserId = anonymousUserIdSelector(state);

  if (!anonymousUserId) {
    return Promise.resolve();
  }

  const uid = authSelectors.uidSelector(state);
  return dispatch(
    api.users.update(uid, currentUserIsAnonymous, { anonymousUserId }),
  ).then(() => dispatch(reset()));
};
