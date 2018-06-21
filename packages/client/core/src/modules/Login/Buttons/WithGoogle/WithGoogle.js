import React from 'react';
import PropTypes from 'prop-types';
import * as firebaseConfig from '@pesposa/core/src/config/firebase';
import authConfig from '../../../../config/auth';
import GoogleButton from './GoogleButton/GoogleButton';

const providerId = firebaseConfig.PROVIDER_IDS.google;

const LoginWithGoogle = ({ signUp, login, fullWidth }) => (
  <GoogleButton
    fullWidth={fullWidth}
    onClick={() => login({ provider: 'google', ...authConfig[providerId] })}
  >
    {signUp ? 'Continue' : 'Login'} with Google
  </GoogleButton>
);

LoginWithGoogle.propTypes = {
  login: PropTypes.func.isRequired,
  fullWidth: PropTypes.bool,
};

LoginWithGoogle.defaultProps = {
  fullWidth: false,
};

export default LoginWithGoogle;
