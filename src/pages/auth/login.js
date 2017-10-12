import React from 'react';
import { Grid } from 'material-ui';
import Login from '../../auth/Login';
import WithPhoneNumber from '../../auth/Login/WithPhoneNumber';
import WithFacebook from '../../auth/Login/WithFacebook';

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
