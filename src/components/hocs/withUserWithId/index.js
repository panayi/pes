import * as R from 'ramda';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import { selectors as authSelectors } from 'store/firebase/auth';

const withUserWithId = userIdSelector =>
  connectedAuthWrapper({
    authenticatedSelector: R.both(
      authSelectors.isAuthenticatedSelector,
      authSelectors.isCurrentUserSelector(userIdSelector),
    ),
  });

export default withUserWithId;
