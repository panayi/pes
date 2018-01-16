import { isNilOrEmpty } from 'ramda-adjunct';
import api from 'services/api';
import { selectors as authSelectors } from 'store/auth';
import * as utils from './utils';

export const setProfile = user => dispatch =>
  dispatch(api.profile.update(utils.profileFactory(user)));

export const setCurrentUserGeoposition = geoposition => (
  dispatch,
  getState,
) => {
  const state = getState();
  const uid = authSelectors.uidSelector(state);
  const isAnonymous = authSelectors.isAnonymousSelector(state);

  if (isNilOrEmpty(uid)) {
    return null;
  }

  return dispatch(api.users.update(uid, isAnonymous, { geoposition }));
};

export const setCurrentUserIp = () => (dispatch, getState) => {
  const state = getState();
  const token = authSelectors.tokenSelector(state);

  return dispatch(api.app.setCurrentUserIp({ token }));
};
