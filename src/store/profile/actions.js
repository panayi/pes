import { isNilOrEmpty } from 'ramda-adjunct';
import api from 'services/api';
import { selectors as authSelectors } from 'store/auth';
import * as utils from './utils';

export const setProfile = user => dispatch =>
  dispatch(api.profile.update(utils.profileFactory(user)));

export const setCurrentUserLocation = geoposition => (dispatch, getState) => {
  const state = getState();
  const uid = authSelectors.uidSelector(state);
  const token = authSelectors.tokenSelector(state);

  if (isNilOrEmpty(uid) || isNilOrEmpty(token)) {
    return null;
  }

  return dispatch(api.app.setCurrentUserLocation({ geoposition }, { token }));
};
