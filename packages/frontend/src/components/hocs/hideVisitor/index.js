import * as R from 'ramda';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import omitProps from 'utils/omitProps';
import { isAuthenticatedSelector } from 'store/firebase/auth/selectors';

const hideVisitor = component =>
  R.compose(
    connectedAuthWrapper({
      authenticatedSelector: isAuthenticatedSelector,
    }),
    omitProps(['isAuthenticated', 'isAuthenticating', 'dispatch']),
  )(component);

export default hideVisitor;
