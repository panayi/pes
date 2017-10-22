import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'material-ui';
import { auth } from 'config/auth';

const WithGoogle = ({ login, onSuccess, onError }) => (
  <Button
    onClick={() =>
      login({ provider: 'google', ...auth.google })
        .then(onSuccess)
        .catch(onError)
    }
    name="google"
  >
    Sign in with Google
  </Button>
);

WithGoogle.propTypes = {
  login: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export default WithGoogle;
