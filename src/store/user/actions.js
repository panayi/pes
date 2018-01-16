import { isNilOrEmpty } from 'ramda-adjunct';
import api from 'services/api';
import { selectors as authSelectors } from 'store/auth';
import * as utils from './utils';

export const setProfile = user => dispatch =>
  dispatch(api.profile.update(utils.profileFactory(user)));

export const setCurrentUserLocation = location => (dispatch, getState) => {
  const uid = authSelectors.uidSelector(getState());

  if (isNilOrEmpty(uid)) {
    return null;
  }

  return dispatch(api.users.update(uid, { location }));
};

export const setCurrentUserIp = () => (dispatch, getState) => {
  const state = getState();
  const uid = authSelectors.uidSelector(state);
  const token = authSelectors.tokenSelector(state);

  return dispatch(api.app.setUserIp(uid, { token }));
};
