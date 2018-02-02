import React from 'react';
import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { routerActions } from 'react-router-redux';
import Grid from 'material-ui/Grid';
import { selectors as authSelectors } from 'store/firebase/auth/selectors';
import Spinner from 'components/atoms/Spinner';

const locationHelper = locationHelperBuilder({});

const Loader = () => (
  <Grid align="center" justify="center" style={{ height: '100vh' }}>
    <Spinner />
  </Grid>
);

export default (options = {}) =>
  connectedReduxRedirect({
    // This sends the user either to the query param route if we have one,
    // or to the landing page if none is specified and the user is already logged in.
    redirectPath: (state, ownProps) =>
      locationHelper.getRedirectQueryParam(ownProps) || '/',
    // This prevents us from adding the query parameter when we send the user away from the login page
    allowRedirectBack: false,
    authenticatedSelector: authSelectors.isNotAuthenticatedSelector,
    authenticatingSelector: authSelectors.isAuthenticatingSelector,
    AuthenticatingComponent: Loader,
    redirectAction: routerActions.replace,
    ...options,
  });
