import React from 'react';
import PropTypes from 'prop-types';
import authConfig from 'config/auth';
import withLoginAction from 'components/hocs/withLoginAction';
import FacebookButton from 'components/atoms/FacebookButton';

const LoginWithFacebook = ({ login, ...rest }) => (
  <FacebookButton
    {...rest}
    raised
    onClick={() => login({ provider: 'facebook', ...authConfig.facebook })}
  >
    Login with Facebook
  </FacebookButton>
);

LoginWithFacebook.propTypes = {
  login: PropTypes.func.isRequired,
};

export default withLoginAction(LoginWithFacebook);
