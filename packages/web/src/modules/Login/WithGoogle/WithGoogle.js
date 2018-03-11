import React from 'react';
import PropTypes from 'prop-types';
import authConfig from '@pesposa/core/src/config/auth';
import * as firebaseConfig from '@pesposa/core/src/config/firebase';
import GoogleButton from 'components/GoogleButton/GoogleButton';
import withLoginAction from '../withLoginAction';

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
