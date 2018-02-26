import firebaseApi from 'services/firebase';

export const updateProfile = props => dispatch =>
  dispatch(firebaseApi.profile.update(props));
