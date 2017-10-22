import * as R from 'ramda';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import omitProps from 'utils/omitProps';
import { isAdminSelector } from 'store/auth/selectors';

export default component => R.compose(
  connectedAuthWrapper({
    authenticatedSelector: isAdminSelector,
  }),
  omitProps(['isAuthenticated', 'isAuthenticating']),
)(component);
