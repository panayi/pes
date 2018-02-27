import React from 'react';
import PropTypes from 'prop-types';
import authConfig from '@pesposa/core/src/config/auth';
import * as firebaseConfig from '@pesposa/core/src/config/firebase';
import withLoginAction from 'hocs/withLoginAction';
import FacebookButton from 'components/FacebookButton/FacebookButton';

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
