import React from 'react';
import * as R from 'ramda';
import { Toolbar } from 'rebass';
import Link from '../../lib/components/Link';
import ProfileImage from '../../auth/components/ProfileImage';
import hideUser from '../../auth/visibility/hideUser';
import hideVisitor from '../../auth/visibility/hideVisitor';
import hideNonAdmin from '../../auth/visibility/hideNonAdmin';
import logoutHoc from '../../auth/logout/logout';

const LoginLink = hideUser(Link.Nav);

const LogoutLink = R.compose(
  hideVisitor,
  logoutHoc,
)(Link.Nav);

const AdminLink = hideNonAdmin(Link.Nav);

export default () => (
  <Toolbar bg="blue">
    <Link.Nav
      to="/"
      exact
    >
      Pesposa
    </Link.Nav>
    <Link.Nav
      ml="auto"
      to="/p"
      exact
    >
      Sell your stuff
    </Link.Nav>
    <AdminLink
      to="/admin"
    >
      Admin
    </AdminLink>
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
      <ProfileImage.Avatar />
    </Link>
  </Toolbar>
);
