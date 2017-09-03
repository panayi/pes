import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'rebass';

const WithGoogle = ({ login }) => (
  <Button
    onClick={() => login({ provider: 'google' })}
  >
    Sign in with Google
  </Button>
);

WithGoogle.propTypes = {
  login: PropTypes.func.isRequired,
};

export default WithGoogle;
