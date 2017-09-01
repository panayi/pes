import React from 'react';
import R from 'ramda';
import { Route, Switch } from 'react-router-dom';
import { Flex } from 'rebass';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import BounceLoader from 'halogen/BounceLoader';
import { isNotAuthenticatedSelector, isAuthenticatingSelector } from '../../Auth/auth';
import Login from './login';
import Register from './register';

const Auth = () => (
  <Switch>
    <Route exact path="/auth/login" component={Login} />
    <Route exact path="/auth/register" component={Register} />
  </Switch>
);

const Loader = () => (
  <Flex
    align="center"
    justify="center"
    style={{ height: '100vh' }}
  >
    <BounceLoader
      color="#26A65B"
      size="60px"
    />
  </Flex>
);

const locationHelper = locationHelperBuilder({});

export default connectedRouterRedirect({
  // This sends the user either to the query param route if we have one,
  // or to the landing page if none is specified and the user is already logged in
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
  // This prevents us from adding the query parameter when we send the user away from the login page
  allowRedirectBack: false,
  authenticatedSelector: R.both(
    R.compose(
      R.not,
      isAuthenticatingSelector,
    ),
    isNotAuthenticatedSelector
  ),
  authenticatingSelector: isAuthenticatingSelector,
  AuthenticatingComponent: Loader,
})(Auth);
