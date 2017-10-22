import React from 'react';
import { Grid } from 'material-ui';
import Login from 'components/smarts/Login';
import WithPhoneNumber from 'components/smarts/Login/WithPhoneNumber';
import WithFacebook from 'components/smarts/Login/WithFacebook';

export default () => (
  <Grid
    align="center"
    justify="center"
    style={{ height: '100vh' }}
  >
    <Login component={WithPhoneNumber} />
    <Login component={WithFacebook} />
  </Grid>
);
