import * as R from 'ramda';
import { withProps } from 'recompose';
import { routerActions } from 'react-router-redux';
import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import { selectors as authSelectors } from 'store/firebase/auth';
import Spinner from 'components/Spinner/Spinner';

const CenteredSpinner = withProps({
  centered: true,
})(Spinner);

const needsUser = options =>
  connectedReduxRedirect({
    redirectPath: '/',
    allowRedirectBack: false,
    authenticatedSelector: authSelectors.isAuthenticatedSelector,
    authenticatingSelector: authSelectors.isAuthenticatingSelector,
    AuthenticatingComponent: CenteredSpinner,
    redirectAction: routerActions.replace,
    ...R.defaultTo({}, options),
  });

export default needsUser;