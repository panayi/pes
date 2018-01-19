import * as R from 'ramda';
import { firebaseConnect } from 'react-redux-firebase';
import { defaultProps, withProps } from 'recompose';
import omitProps from 'utils/omitProps';
import noop from 'utils/noop';

export const logout = R.compose(
  defaultProps({
    onLogout: noop,
  }),
  withProps(({ firebase, onLogout }) => ({
    onClick: () => {
      firebase.logout();
      onLogout();
    },
  })),
  omitProps(['onLogout']),
);

export default R.compose(firebaseConnect(), logout);
