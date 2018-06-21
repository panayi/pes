import * as R from 'ramda';
import { withProps } from 'recompose';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { selectors as authSelectors } from '../../store/firebase/auth';
import Spinner from '../../components/Spinner/Spinner';

const locationHelper = locationHelperBuilder({});

const CenteredSpinner = withProps({
  centered: true,
})(Spinner);

const needsVisitor = options =>
  connectedRouterRedirect({
    // This sends the user either to the query param route if we have one,
    // or to the landing page if none is specified and the user is already logged in.
    redirectPath: (state, ownProps) =>
      locationHelper.getRedirectQueryParam(ownProps) || '/',
    // This prevents us from adding the query parameter when we send the user away from the login page
    allowRedirectBack: false,
    authenticatedSelector: authSelectors.isNotAuthenticatedSelector,
    authenticatingSelector: authSelectors.isAuthenticatingSelector,
    AuthenticatingComponent: CenteredSpinner,
    ...R.defaultTo({}, options),
  });

export default needsVisitor;
