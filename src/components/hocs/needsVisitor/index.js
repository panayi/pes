import React from 'react';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { Grid } from 'material-ui';
import BounceLoader from 'react-spinners';
import { isNotAuthenticatedSelector, isAuthenticatingSelector } from 'store/auth/selectors';

const locationHelper = locationHelperBuilder({});

const Loader = () => (
  <Grid
    align="center"
    justify="center"
    style={{ height: '100vh' }}
  >
    <BounceLoader
      color="#26A65B"
      size="60px"
    />
  </Grid>
);


export default (options = {}) => connectedRouterRedirect({
  // This sends the user either to the query param route if we have one,
  // or to the landing page if none is specified and the user is already logged in
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
  // This prevents us from adding the query parameter when we send the user away from the login page
  allowRedirectBack: false,
  authenticatedSelector: isNotAuthenticatedSelector,
  authenticatingSelector: isAuthenticatingSelector,
  AuthenticatingComponent: Loader,
  ...options,
});
