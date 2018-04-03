import firebaseApi from 'services/firebase';

export const updateProfile = props => dispatch =>
  dispatch(firebaseApi.profile.update(props));

export const confirmAdult = () => dispatch =>
  dispatch(updateProfile({ adult: true }));
