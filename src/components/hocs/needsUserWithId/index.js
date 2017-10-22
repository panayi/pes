import * as R from 'ramda';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import {
  isUserSelector,
  isAuthenticatedSelector,
  isAuthenticatingSelector,
} from 'store/auth/selectors';

export default ({ userSelector, ...otherOptions }) => connectedRouterRedirect({
  redirectPath: '/',
  allowRedirectBack: false,
  authenticatedSelector: R.both(isAuthenticatedSelector, isUserSelector(userSelector)),
  authenticatingSelector: isAuthenticatingSelector,
  ...otherOptions,
});
