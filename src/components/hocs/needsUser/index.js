import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import { isAuthenticatedSelector, isAuthenticatingSelector } from 'store/auth/selectors';

export default (options = {}) => connectedRouterRedirect({
  redirectPath: '/auth/login',
  authenticatedSelector: isAuthenticatedSelector,
  authenticatingSelector: isAuthenticatingSelector,
  ...options,
});
