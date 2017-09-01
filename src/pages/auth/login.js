import React from 'react';
import { Flex, Box } from 'rebass';
import Login from '../../Auth/Login';

export default () => (
  <Flex
    align="center"
    justify="center"
    style={{ height: '100vh' }}
  >
    <Box>
      <Login with="password" />
      <Login with="google" />
    </Box>
  </Flex>
);
