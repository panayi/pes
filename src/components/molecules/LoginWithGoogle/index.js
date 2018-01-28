import React from 'react';
import PropTypes from 'prop-types';
import { PROVIDER_IDS } from 'constants/firebase';
import authConfig from 'config/auth';
import withLoginAction from 'components/hocs/withLoginAction';
import GoogleButton from 'components/atoms/GoogleButton';

const providerId = PROVIDER_IDS.google;

const LoginWithGoogle = ({ login, ...rest }) => (
  <GoogleButton
    {...rest}
    onClick={() => login({ provider: 'google', ...authConfig[providerId] })}
  >
    Login with Google
  </GoogleButton>
);

LoginWithGoogle.propTypes = {
  login: PropTypes.func.isRequired,
};

export default withLoginAction(LoginWithGoogle);
