import * as R from 'ramda';
import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import { routerActions } from 'react-router-redux';
import { isAuthenticatedSelector, isAuthenticatingSelector } from 'store/auth/selectors';

export default options => connectedReduxRedirect({
  redirectPath: '/auth/login',
  authenticatedSelector: isAuthenticatedSelector,
  authenticatingSelector: isAuthenticatingSelector,
  redirectAction: routerActions.replace,
  ...R.defaultTo({}, options),
});
