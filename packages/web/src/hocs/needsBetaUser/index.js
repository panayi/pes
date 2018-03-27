import * as R from 'ramda';
import { withRouter } from 'react-router-dom';
import { branch, withProps } from 'recompose';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import env from '@pesposa/core/src/config/env';
import { connectData } from 'lib/connectData';
import { models } from 'store/firebase/data';
import { selectors as authSelectors } from 'store/firebase/auth';
import { selectors as profileSelectors } from 'store/firebase/profile';
import Spinner from 'components/Spinner/Spinner';

const CenteredSpinner = withProps({
  centered: true,
})(Spinner);

const mapDataToProps = {
  betaUsers: models.betaUsers.all,
};

const needsBetaUser = branch(
  R.always(env.betaEnabled),
  R.compose(
    withRouter,
    connectData(mapDataToProps),
    connectedRouterRedirect({
      redirectPath: '/beta',
      allowRedirectBack: false,
      authenticatedSelector: profileSelectors.isBetaUserSelector,
      authenticatingSelector: authSelectors.isAuthenticatingSelector,
      AuthenticatingComponent: CenteredSpinner,
    }),
  ),
);

export default needsBetaUser;
