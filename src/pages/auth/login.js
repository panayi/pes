import React from 'react';
import { Flex, Box } from 'rebass';
import Login from '../../Auth/Login';
import WithGoogle from '../../Auth/Login/WithGoogle';
import WithFacebook from '../../Auth/Login/WithFacebook';

export default () => (
  <Flex
    align="center"
    justify="center"
    style={{ height: '100vh' }}
  >
    <Box>
      <Login component={WithGoogle} />
    </Box>
    <Box>
      <Login component={WithFacebook} />
    </Box>
  </Flex>
);
