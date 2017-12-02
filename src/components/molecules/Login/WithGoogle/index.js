import PropTypes from 'prop-types';
import * as R from 'ramda';
import { withProps } from 'recompose';
import { Button } from 'material-ui';
import { auth } from 'config';
import withLogin from '../withLogin';

const LoginWithGoogle = R.compose(
  withLogin,
  withProps(({ login }) => ({
    onClick: () => login({ provider: 'google', ...auth.facebook }),
    name: 'google',
    children: 'Sign in with Google',
  })),
)(Button);

LoginWithGoogle.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginWithGoogle;
