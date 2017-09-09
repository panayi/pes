import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'rebass';
import { auth } from '../../../lib/config';

const WithFacebook = ({ login, onSuccess, onError }) => (
  <Button
    onClick={() =>
      login({ provider: 'facebook', ...auth.facebook })
        .then(onSuccess)
        .catch(onError)
    }
  >
    Sign in with Facebook
  </Button>
);

WithFacebook.propTypes = {
  login: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export default WithFacebook;
