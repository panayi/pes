import * as R from 'ramda';
import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import { routerActions } from 'react-router-redux';
import {
  isAdminSelector,
  isAuthenticatingSelector,
} from 'store/auth/selectors';

export default options =>
  connectedReduxRedirect({
    redirectPath: '/',
    authenticatedSelector: isAdminSelector,
    authenticatingSelector: isAuthenticatingSelector,
    redirectAction: routerActions.replace,
    ...R.defaultTo({}, options),
  });
