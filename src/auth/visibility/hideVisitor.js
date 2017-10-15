import * as R from 'ramda';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import omitProps from '../../lib/helpers/omitProps';
import { isAuthenticatedSelector } from '../auth';

export default component => R.compose(
  connectedAuthWrapper({
    authenticatedSelector: isAuthenticatedSelector,
  }),
  omitProps(['isAuthenticated', 'isAuthenticating']),
)(component);
