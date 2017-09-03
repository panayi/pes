import React from 'react';
import R from 'ramda';
import { Toolbar } from 'rebass';
import Link from '../../../lib/components/Link';
import hideUser from '../../../Auth/hideUserHoc';
import hideVisitor from '../../../Auth/hideVisitorHoc';
import logoutHoc from '../../../Auth/logoutHoc';

const LoginLink = hideUser(Link.Nav);

const LogoutLink = R.compose(
  hideVisitor,
  logoutHoc,
)(Link.Nav);

export default () => (
  <Toolbar>
    <Link.Nav
      to="/"
      exact
    >
      Pesposa
    </Link.Nav>
    <Link.Nav
      ml="auto"
      to="/post"
      exact
    >
      Sell your stuff
    </Link.Nav>
    <LoginLink
      to="/auth/login"
      exact
    >
      Login
    </LoginLink>
    <LogoutLink>
      Logout
    </LogoutLink>
  </Toolbar>
);
