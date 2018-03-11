import React from 'react';
import PropTypes from 'prop-types';
import authConfig from '@pesposa/core/src/config/auth';
import * as firebaseConfig from '@pesposa/core/src/config/firebase';
import FacebookButton from 'components/FacebookButton/FacebookButton';
import withLoginAction from '../withLoginAction';

const providerId = firebaseConfig.PROVIDER_IDS.facebook;

const LoginWithFacebook = ({ login, fullWidth }) => (
  <FacebookButton
    fullWidth={fullWidth}
    variant="raised"
    onClick={() => login({ provider: 'facebook', ...authConfig[providerId] })}
  >
    Login with Facebook
  </FacebookButton>
);

LoginWithFacebook.propTypes = {
  login: PropTypes.func.isRequired,
  fullWidth: PropTypes.bool,
};

LoginWithFacebook.defaultProps = {
  fullWidth: false,
};

export default withLoginAction(LoginWithFacebook);
