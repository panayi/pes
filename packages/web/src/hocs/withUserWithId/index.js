import * as R from 'ramda';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import omitProps from 'utils/omitProps';
import { selectors as authSelectors } from 'store/firebase/auth';

const withUserWithId = userIdSelector =>
  R.compose(
    connectedAuthWrapper({
      authenticatedSelector: R.both(
        authSelectors.isAuthenticatedSelector,
        authSelectors.isCurrentUserSelector(userIdSelector),
      ),
    }),
    omitProps(['isAuthenticated', 'isAuthenticating', 'dispatch']),
  );

export default withUserWithId;
