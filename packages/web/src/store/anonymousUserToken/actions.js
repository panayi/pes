import * as R from 'ramda';
import { createAction } from 'redux-actions';
import api from 'services/api';
import { selectors as authSelectors } from 'store/firebase/auth';
import * as types from './types';
import { anonymousUserTokenSelector } from './selectors';

const reset = createAction(types.RESET);

export const migrateAnonymousUser = () => (dispatch, getState) => {
  const state = getState();

  const anonymousUserToken = anonymousUserTokenSelector(state);

  if (R.isNil(anonymousUserToken)) {
    return Promise.resolve();
  }

  const token = authSelectors.tokenSelector(state);
  return dispatch(api.migrateAnonymousUser({ token, anonymousUserToken })).then(
    () => dispatch(reset()),
  );
};
