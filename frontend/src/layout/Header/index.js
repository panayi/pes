import React from 'react';
import R from 'ramda';
import { Toolbar } from 'rebass';
import Link from '../../lib/components/Link';
import ProfileImage from '../../lib/components/ProfileImage';
import hideUser from '../../auth/visibility/hideUserHoc';
import hideVisitor from '../../auth/visibility/hideVisitorHoc';
import hideNonAdmin from '../../auth/visibility/hideNonAdminHoc';
import logoutHoc from '../../auth/logout/logoutHoc';

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
      to="/post"
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
      <ProfileImage />
    </Link>
  </Toolbar>
);
