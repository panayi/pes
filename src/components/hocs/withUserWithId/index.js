import * as R from 'ramda';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import { isAuthenticatedSelector, isUserSelector } from 'store/auth/selectors';

export default userSelector => connectedAuthWrapper({
  authenticatedSelector: R.both(isAuthenticatedSelector, isUserSelector(userSelector)),
});
