import * as R from 'ramda';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import omitProps from '../../lib/helpers/omitProps';
import { isAdminSelector } from '../auth';

export default component => R.compose(
  connectedAuthWrapper({
    authenticatedSelector: isAdminSelector,
  }),
  omitProps(['isAuthenticated', 'isAuthenticating']),
)(component);
