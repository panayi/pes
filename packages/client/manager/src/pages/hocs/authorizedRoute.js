import * as R from 'ramda';
import needsUser from '@pesposa/client-core/src/hocs/needsUser';
import needsAdmin from 'hocs/needsAdmin';

const authorizedRoute = R.compose(
  needsUser({ redirectPath: '/login', allowRedirectBack: true }),
  needsAdmin({ redirectPath: '/unauthorized' }),
);

export default authorizedRoute;
