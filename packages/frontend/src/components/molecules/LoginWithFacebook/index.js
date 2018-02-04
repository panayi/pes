import React from 'react';
import PropTypes from 'prop-types';
import { auth as authConfig, firebase as firebaseConfig } from 'pesposa-config';
import withLoginAction from 'components/hocs/withLoginAction';
import FacebookButton from 'components/atoms/FacebookButton';

const providerId = firebaseConfig.PROVIDER_IDS.facebook;

const LoginWithFacebook = ({ login, fullWidth }) => (
  <FacebookButton
    fullWidth={fullWidth}
    raised
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
