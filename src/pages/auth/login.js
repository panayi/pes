import React from 'react';
import { Flex, Box } from 'rebass';
import Login from '../../auth/Login';
import WithPhoneNumber from '../../auth/Login/WithPhoneNumber';

export default () => (
  <Flex
    align="center"
    justify="center"
    style={{ height: '100vh' }}
    column
  >
    <Box>
      <Login component={WithPhoneNumber} />
    </Box>
  </Flex>
);
