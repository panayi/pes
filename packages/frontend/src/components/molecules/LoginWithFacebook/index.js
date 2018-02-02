import React from 'react';
import PropTypes from 'prop-types';
import { firebase as firebaseConstants } from 'pesposa-core/constants';
import { auth as authConfig } from 'pesposa-config';
import withLoginAction from 'components/hocs/withLoginAction';
import FacebookButton from 'components/atoms/FacebookButton';

const providerId = firebaseConstants.PROVIDER_IDS.facebook;

const LoginWithFacebook = ({ login, ...rest }) => (
  <FacebookButton
    {...rest}
    raised
    onClick={() => login({ provider: 'facebook', ...authConfig[providerId] })}
  >
    Login with Facebook
  </FacebookButton>
);

LoginWithFacebook.propTypes = {
  login: PropTypes.func.isRequired,
};

export default withLoginAction(LoginWithFacebook);
