import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import { isAdminSelector, isAuthenticatingSelector } from 'store/auth/selectors';

export default (options = {}) => connectedRouterRedirect({
  redirectPath: '/',
  authenticatedSelector: isAdminSelector,
  authenticatingSelector: isAuthenticatingSelector,
  ...options,
});
