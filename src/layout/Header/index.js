import React from 'react';
import * as R from 'ramda';
import { AppBar, Toolbar } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import Link from '../../lib/components/Link';
import ProfileImage from '../../auth/components/ProfileImage';
import hideUser from '../../auth/visibility/hideUser';
import hideVisitor from '../../auth/visibility/hideVisitor';
import hideNonAdmin from '../../auth/visibility/hideNonAdmin';
import logoutHoc from '../../auth/logout/logout';

const LoginLink = hideUser(Link);

const ProfileLink = hideVisitor(Link);

const LogoutLink = R.compose(
  hideVisitor,
  logoutHoc,
)(Link);

const AdminLink = hideNonAdmin(Link);

const styles = {
  header: {
    boxShadow: 'none',
  },
};

const Header = ({ classes }) => (
  <AppBar className={classes.header}>
    <Toolbar>
      <Link
        to="/"
        exact
        color="contrast"
      >
        Pesposa
      </Link>
      <div style={{ flex: '1 1 auto' }} />
      <Link
        ml="auto"
        to="/p"
        exact
        color="contrast"
      >
        Sell your stuff
      </Link>
      <AdminLink
        to="/admin"
        color="contrast"
      >
        Admin
      </AdminLink>
      <LoginLink
        to="/auth/login"
        exact
        color="contrast"
      >
        Login
      </LoginLink>
      <LogoutLink color="contrast">
        Logout
      </LogoutLink>
      <ProfileLink
        to="/profile"
        color="contrast"
      >
        <ProfileImage.Avatar />
      </ProfileLink>
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(Header);
