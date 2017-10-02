import React from 'react';
import { Flex, Box } from 'rebass';
import Login from '../../auth/Login';
import WithPhoneNumber from '../../auth/Login/WithPhoneNumber';
import WithFacebook from '../../auth/Login/WithFacebook';

export default () => (
  <Flex
    align="center"
    justify="center"
    style={{ height: '100vh' }}
    column
  >
    <Box>
      <Login component={WithPhoneNumber} />
      <Login component={WithFacebook} />
    </Box>
  </Flex>
);
