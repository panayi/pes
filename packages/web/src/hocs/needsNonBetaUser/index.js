import * as R from 'ramda';
import { withRouter } from 'react-router-dom';
import { withProps } from 'recompose';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import env from '@pesposa/core/src/config/env';
import { connectData } from 'lib/connectData';
import { models } from 'store/firebase/data';
import { selectors as authSelectors } from 'store/firebase/auth';
import Spinner from 'components/Spinner/Spinner';

const CenteredSpinner = withProps({
  centered: true,
})(Spinner);

const mapDataToProps = {
  betaUsers: models.betaUsers.allObjects,
};

const needsNonBetaUser = R.compose(
  withRouter,
  connectData(mapDataToProps),
  connectedRouterRedirect({
    redirectPath: '/',
    allowRedirectBack: false,
    authenticatedSelector: R.both(
      R.always(env.betaEnabled),
      R.complement(authSelectors.isBetaUserSelector),
    ),
    authenticatingSelector: authSelectors.isAuthenticatingSelector,
    AuthenticatingComponent: CenteredSpinner,
  }),
);

export default needsNonBetaUser;
