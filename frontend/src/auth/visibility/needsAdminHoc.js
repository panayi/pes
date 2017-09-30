import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import { isAdminSelector, isAuthenticatingSelector } from '../auth';

export default (options = {}) => connectedRouterRedirect({
  redirectPath: '/',
  authenticatedSelector: isAdminSelector,
  authenticatingSelector: isAuthenticatingSelector,
  ...options,
});
