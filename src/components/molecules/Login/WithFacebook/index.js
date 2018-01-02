import PropTypes from 'prop-types';
import * as R from 'ramda';
import { withProps } from 'recompose';
import { Button } from 'material-ui';
import authConfig from 'config/auth';
import withLogin from '../withLogin';

const LoginWithFacebook = R.compose(
  withLogin,
  withProps(({ login }) => ({
    onClick: () => login({ provider: 'facebook', ...authConfig.facebook }),
    name: 'facebook',
    children: 'Sign in with Facebook',
  })),
)(Button);

LoginWithFacebook.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginWithFacebook;
