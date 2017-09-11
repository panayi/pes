import R from 'ramda';
import { firebaseConnect } from 'react-redux-firebase';
import { defaultProps, withProps } from 'recompose';
import noop from '../../lib/helpers/noop';

export default R.compose(
  firebaseConnect(),
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
);
