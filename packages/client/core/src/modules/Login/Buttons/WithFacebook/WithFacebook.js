import React from 'react';
import PropTypes from 'prop-types';
import * as firebaseConfig from '@pesposa/core/src/config/firebase';
import authConfig from '../../../../config/auth';
import FacebookButton from './FacebookButton/FacebookButton';

const providerId = firebaseConfig.PROVIDER_IDS.facebook;

const LoginWithFacebook = ({ signUp, login, fullWidth }) => (
  <FacebookButton
    fullWidth={fullWidth}
    variant="raised"
    onClick={() => login({ provider: 'facebook', ...authConfig[providerId] })}
  >
    {signUp ? 'Continue' : 'Login'} with Facebook
  </FacebookButton>
);

LoginWithFacebook.propTypes = {
  login: PropTypes.func.isRequired,
  fullWidth: PropTypes.bool,
};

LoginWithFacebook.defaultProps = {
  fullWidth: false,
};

export default LoginWithFacebook;
