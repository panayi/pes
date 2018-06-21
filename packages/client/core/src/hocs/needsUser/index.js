import * as R from 'ramda';
import { withRouter } from 'react-router-dom';
import { withProps } from 'recompose';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import { selectors as authSelectors } from '../../store/firebase/auth';
import Spinner from '../../components/Spinner/Spinner';

const CenteredSpinner = withProps({
  centered: true,
})(Spinner);

const needsUser = options =>
  R.compose(
    withRouter,
    connectedRouterRedirect({
      redirectPath: '/',
      allowRedirectBack: false,
      authenticatedSelector: authSelectors.isAuthenticatedSelector,
      authenticatingSelector: authSelectors.isAuthenticatingSelector,
      AuthenticatingComponent: CenteredSpinner,
      ...R.defaultTo({}, options),
    }),
  );

export default needsUser;
