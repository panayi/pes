import * as R from 'ramda';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import omitProps from '@pesposa/client-core/src/utils/omitProps';
import { selectors as authSelectors } from '@pesposa/client-core/src/store/firebase/auth';

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
