import { isNilOrEmpty } from 'ramda-adjunct';
import api from 'services/api';
import { uidSelector } from 'store/auth/selectors';
import * as utils from './utils';

export const setProfile = user => dispatch =>
  dispatch(api.profile.update(utils.profileFactory(user)));

export const setUserLocation = location => (dispatch, getState) => {
  const uid = uidSelector(getState());

  if (isNilOrEmpty(uid)) {
    return null;
  }

  return dispatch(api.users.update(uid, { location }));
};
