import * as R from 'ramda';
import { withRouter } from 'react-router-dom';
import { withProps } from 'recompose';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import { selectors as authSelectors } from '@pesposa/client-core/src/store/firebase/auth';
import { selectors as profileSelectors } from '@pesposa/client-core/src/store/firebase/profile';
import Spinner from '@pesposa/client-core/src/components/Spinner/Spinner';

const CenteredSpinner = withProps({
  centered: true,
})(Spinner);

const needsAdmin = options =>
  R.compose(
    withRouter,
    connectedRouterRedirect({
      redirectPath: '/',
      allowRedirectBack: false,
      authenticatedSelector: authSelectors.isAdminSelector,
      authenticatingSelector: R.complement(
        profileSelectors.profileLoadedSelector,
      ),
      AuthenticatingComponent: CenteredSpinner,
      ...R.defaultTo({}, options),
    }),
  );

export default needsAdmin;
