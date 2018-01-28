import api from 'services/api';

export const updateProfile = props => dispatch =>
  dispatch(api.profile.update(props));
