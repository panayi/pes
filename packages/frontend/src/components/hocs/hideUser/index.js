import * as R from 'ramda';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import omitProps from 'utils/omitProps';
import { isNotAuthenticatedSelector } from 'store/firebase/auth/selectors';

const hideUser = component =>
  R.compose(
    connectedAuthWrapper({
      authenticatedSelector: isNotAuthenticatedSelector,
    }),
    omitProps(['isAuthenticated', 'isAuthenticating', 'dispatch']),
  )(component);

export default hideUser;
