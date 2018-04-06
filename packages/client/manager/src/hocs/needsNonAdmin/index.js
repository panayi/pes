import * as R from 'ramda';
import { withRouter } from 'react-router-dom';
import { withProps } from 'recompose';
import { createSelector } from 'reselect';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import { selectors as authSelectors } from '@pesposa/client-core/src/store/firebase/auth';
import { selectors as profileSelectors } from '@pesposa/client-core/src/store/firebase/profile';
import Spinner from '@pesposa/client-core/src/components/Spinner/Spinner';

const authenticatedSelector = createSelector(
  authSelectors.isAuthenticatedSelector,
  authSelectors.isAdminSelector,
  (isAuthenticated, isAdmin) => isAuthenticated && !isAdmin,
);

const CenteredSpinner = withProps({
  centered: true,
})(Spinner);

const needsNonAdmin = options =>
  R.compose(
    withRouter,
    connectedRouterRedirect({
      redirectPath: '/',
      allowRedirectBack: false,
      authenticatedSelector,
      authenticatingSelector: R.complement(
        profileSelectors.profileLoadedSelector,
      ),
      AuthenticatingComponent: CenteredSpinner,
      ...R.defaultTo({}, options),
    }),
  );

export default needsNonAdmin;
