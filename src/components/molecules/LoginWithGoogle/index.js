import React from 'react';
import PropTypes from 'prop-types';
import authConfig from 'config/auth';
import withLoginAction from 'components/hocs/withLoginAction';
import GoogleButton from 'components/atoms/GoogleButton';

const LoginWithGoogle = ({ login, ...rest }) => (
  <GoogleButton
    {...rest}
    onClick={() => login({ provider: 'google', ...authConfig.google })}
  >
    Login with Google
  </GoogleButton>
);

LoginWithGoogle.propTypes = {
  login: PropTypes.func.isRequired,
};

export default withLoginAction(LoginWithGoogle);
