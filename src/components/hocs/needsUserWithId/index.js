import * as R from 'ramda';
import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import { routerActions } from 'react-router-redux';
import {
  isUserSelector,
  isAuthenticatedSelector,
  isAuthenticatingSelector,
} from 'store/auth/selectors';

export default ({ userSelector, ...otherOptions }) =>
  connectedReduxRedirect({
    redirectPath: '/',
    allowRedirectBack: false,
    authenticatedSelector: R.both(
      isAuthenticatedSelector,
      isUserSelector(userSelector),
    ),
    authenticatingSelector: isAuthenticatingSelector,
    redirectAction: routerActions.replace,
    ...otherOptions,
  });
