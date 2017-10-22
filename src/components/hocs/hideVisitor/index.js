import * as R from 'ramda';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import omitProps from 'utils/omitProps';
import { isAuthenticatedSelector } from 'store/auth/selectors';

export default component => R.compose(
  connectedAuthWrapper({
    authenticatedSelector: isAuthenticatedSelector,
  }),
  omitProps(['isAuthenticated', 'isAuthenticating']),
)(component);
