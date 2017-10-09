import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import { isUserSelector, isAuthenticatingSelector } from '../auth';

export default userSelector => connectedRouterRedirect({
  redirectPath: '/',
  allowRedirectBack: false,
  authenticatedSelector: isUserSelector(userSelector),
  authenticatingSelector: isAuthenticatingSelector,
});
