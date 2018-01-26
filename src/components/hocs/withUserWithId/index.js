import * as R from 'ramda';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import { selectors as authSelectors } from 'store/firebase/auth';

export default userSelector =>
  connectedAuthWrapper({
    authenticatedSelector: R.both(
      authSelectors.isAuthenticatedSelector,
      authSelectors.isUserSelector(userSelector),
    ),
  });
