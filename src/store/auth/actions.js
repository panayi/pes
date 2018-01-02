import api from 'services/api';

export const login = credentials => dispatch =>
  dispatch(api.auth.login(credentials));
