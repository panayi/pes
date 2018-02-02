import React from 'react';
import PropTypes from 'prop-types';
import { firebase as firebaseConstants } from 'pesposa-core/constants';
import { auth as authConfig } from 'pesposa-config';
import withLoginAction from 'components/hocs/withLoginAction';
import GoogleButton from 'components/atoms/GoogleButton';

const providerId = firebaseConstants.PROVIDER_IDS.google;

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
