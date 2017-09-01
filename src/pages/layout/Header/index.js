import React from 'react';
import R from 'ramda';
import { NavLink } from 'react-router-dom';
import { Toolbar, NavLink as RebassNavLink } from 'rebass';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import {
  isAuthenticatingSelector,
  isAuthenticatedSelector,
  isNotAuthenticatedSelector,
} from '../../../Auth/auth';
import logoutHoc from '../../../Auth/logoutHoc';

const LoginLink = connectedAuthWrapper({
  authenticatedSelector: R.both(
    R.compose(
      R.not,
      isAuthenticatingSelector,
    ),
    isNotAuthenticatedSelector,
  ),
})(RebassNavLink);

const LogoutLink = R.compose(
  connectedAuthWrapper({
    authenticatedSelector: R.both(
      R.compose(
        R.not,
        isAuthenticatingSelector,
      ),
      isAuthenticatedSelector,
    ),
  }),
  logoutHoc,
)(RebassNavLink);

export default () => (
  <Toolbar>
    <RebassNavLink>
      Pesposa
    </RebassNavLink>
    <RebassNavLink
      name="home"
      to="/"
      is={NavLink}
      exact
    >
      Home
    </RebassNavLink>
    <LoginLink
      ml="auto"
      name="login"
      to="/auth/login"
      is={NavLink}
      exact
    >
      Login
    </LoginLink>
    <LogoutLink
      ml="auto"
    >
      Logout
    </LogoutLink>
  </Toolbar>
);
