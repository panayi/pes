import * as R from 'ramda';
import { createAction } from 'redux-actions';
import * as api from '@pesposa/core/src/client/api';
import { selectors as authSelectors } from '../firebase/auth';
import * as types from './types';
import { anonymousUserTokenSelector } from './selectors';

const reset = createAction(types.RESET);

export const migrateAnonymousUser = () => async (dispatch, getState) => {
  const state = getState();

  const anonymousUserToken = anonymousUserTokenSelector(state);

  if (R.isNil(anonymousUserToken)) {
    return Promise.resolve();
  }

  const token = authSelectors.tokenSelector(state);
  await api.migrateAnonymousUser({ token, anonymousUserToken });
  return dispatch(reset());
};
