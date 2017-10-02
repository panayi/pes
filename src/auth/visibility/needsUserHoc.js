import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import { isAuthenticatedSelector, isAuthenticatingSelector } from '../auth';

export default (options = {}) => connectedRouterRedirect({
  redirectPath: '/auth/login',
  authenticatedSelector: isAuthenticatedSelector,
  authenticatingSelector: isAuthenticatingSelector,
  ...options,
});
