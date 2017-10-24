import React from 'react';
import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { routerActions } from 'react-router-redux';
import { Grid } from 'material-ui';
import Spinner from 'react-spinkit';
import { isNotAuthenticatedSelector, isAuthenticatingSelector } from 'store/auth/selectors';

const locationHelper = locationHelperBuilder({});

const Loader = () => (
  <Grid
    align="center"
    justify="center"
    style={{ height: '100vh' }}
  >
    <Spinner name="circle" />
  </Grid>
);

export default (options = {}) => connectedReduxRedirect({
  // This sends the user either to the query param route if we have one,
  // or to the landing page if none is specified and the user is already logged in.
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
  // This prevents us from adding the query parameter when we send the user away from the login page
  allowRedirectBack: false,
  authenticatedSelector: isNotAuthenticatedSelector,
  authenticatingSelector: isAuthenticatingSelector,
  AuthenticatingComponent: Loader,
  redirectAction: routerActions.replace,
  ...options,
});
