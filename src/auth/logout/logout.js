import * as R from 'ramda';
import { firebaseConnect } from 'react-redux-firebase';
import { defaultProps, withProps } from 'recompose';
import omitProps from '../../lib/helpers/omitProps';
import noop from '../../lib/helpers/noop';

export const logout = R.compose(
  defaultProps({
    onLogout: noop,
  }),
  withProps(({ firebase, onLogout }) => ({
    onClick: () => {
      firebase.logout();
      onLogout();

      // FIXME: react-redux-firebase clears data on logout
      // This is a workaround to get the data back
      window.location.reload();
    },
  })),
  omitProps(['onLogout']),
);

export default R.compose(
  firebaseConnect(),
  logout,
);
