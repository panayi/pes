import * as R from 'ramda';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import { selectors as authSelectors } from 'store/firebase/auth';

const needsUserWithId = ({ userSelector, ...otherOptions }) =>
  connectedRouterRedirect({
    redirectPath: '/',
    allowRedirectBack: false,
    authenticatedSelector: R.both(
      authSelectors.isAuthenticatedSelector,
      authSelectors.isCurrentUserSelector(userSelector),
    ),
    authenticatingSelector: authSelectors.isAuthenticatingSelector,
    ...otherOptions,
  });

export default needsUserWithId;
