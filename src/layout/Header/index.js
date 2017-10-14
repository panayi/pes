import React from 'react';
import * as R from 'ramda';
import { AppBar, Toolbar } from 'material-ui';
import Link from '../../lib/components/Link';
import ProfileImage from '../../auth/components/ProfileImage';
import hideUser from '../../auth/visibility/hideUser';
import hideVisitor from '../../auth/visibility/hideVisitor';
import hideNonAdmin from '../../auth/visibility/hideNonAdmin';
import logoutHoc from '../../auth/logout/logout';

const LoginLink = hideUser(Link);

const LogoutLink = R.compose(
  hideVisitor,
  logoutHoc,
)(Link);

const AdminLink = hideNonAdmin(Link);

export default () => (
  <AppBar color="default">
    <Toolbar>
      <Link
        to="/"
        exact
      >
        Pesposa
      </Link>
      <div style={{ flex: '1 1 auto' }} />
      <Link
        ml="auto"
        to="/p"
        exact
      >
        Sell your stuff
      </Link>
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
  </AppBar>
);
