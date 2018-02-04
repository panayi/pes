import React from 'react';
import PropTypes from 'prop-types';
import { firebase as firebaseConfig, auth as authConfig } from 'pesposa-config';
import withLoginAction from 'components/hocs/withLoginAction';
import GoogleButton from 'components/atoms/GoogleButton';

const providerId = firebaseConfig.PROVIDER_IDS.google;

const LoginWithGoogle = ({ login, fullWidth }) => (
  <GoogleButton
    fullWidth={fullWidth}
    onClick={() => login({ provider: 'google', ...authConfig[providerId] })}
  >
    Login with Google
  </GoogleButton>
);

LoginWithGoogle.propTypes = {
  login: PropTypes.func.isRequired,
  fullWidth: PropTypes.bool,
};

LoginWithGoogle.defaultProps = {
  fullWidth: false,
};

export default withLoginAction(LoginWithGoogle);
