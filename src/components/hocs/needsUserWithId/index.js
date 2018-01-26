import * as R from 'ramda';
import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import { routerActions } from 'react-router-redux';
import { selectors as authSelectors } from 'store/firebase/auth';

export default ({ userSelector, ...otherOptions }) =>
  connectedReduxRedirect({
    redirectPath: '/',
    allowRedirectBack: false,
    authenticatedSelector: R.both(
      authSelectors.isAuthenticatedSelector,
      authSelectors.isUserSelector(userSelector),
    ),
    authenticatingSelector: authSelectors.isAuthenticatingSelector,
    redirectAction: routerActions.replace,
    ...otherOptions,
  });
