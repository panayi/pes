import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'rebass';

const WithGoogle = ({ login, onSuccess, onError }) => (
  <Button
    onClick={() => login({ provider: 'google', type: 'popup' }).then(onSuccess).catch(onError)}
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
