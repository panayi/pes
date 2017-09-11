import React from 'react';
import { Flex, Box } from 'rebass';
import Login from '../../Auth/Login';
import WithFacebook from '../../Auth/Login/WithFacebook';
import WithPhoneNumber from '../../Auth/Login/WithPhoneNumber';

export default () => (
  <Flex
    align="center"
    justify="center"
    style={{ height: '100vh' }}
    column
  >
    <Box>
      <Login component={WithFacebook} />
    </Box>
    <Box>
      <Login component={WithPhoneNumber} />
    </Box>
  </Flex>
);
