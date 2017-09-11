import React from 'react';
import R from 'ramda';
import { Toolbar } from 'rebass';
import Link from '../../../lib/components/Link';
import ProfileImage from '../../../lib/components/ProfileImage';
import hideUser from '../../../auth/hideUserHoc';
import hideVisitor from '../../../auth/hideVisitorHoc';
import logoutHoc from '../../../auth/logoutHoc';

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
    <Link to="/profile">
      <ProfileImage />
    </Link>
  </Toolbar>
);
