import * as profile from '@pesposa/core/src/client/profile';

export const updateProfile = props => (dispatch, getState, getFirebase) =>
  profile.update(getFirebase(), props);

export const confirmAdult = () => dispatch =>
  dispatch(updateProfile({ adult: true }));
