import React from 'react';
import * as R from 'ramda';
import { AppBar, Toolbar } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import Link from 'components/molecules/Link';
import ProfileImage from 'components/molecules/ProfileImage';
import hideUser from 'components/hocs/hideUser';
import hideVisitor from 'components/hocs/hideVisitor';
import hideNonAdmin from 'components/hocs/hideNonAdmin';
import logoutHoc from 'components/hocs/logout/logout';
import Modal from 'components/organisms/Modal';
import CreatePostForm from 'components/smarts/CreatePostForm';

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
      <Modal
        toggleContent="Sell your stuff"
        buttonProps={{ color: 'contrast' }}
        ignoreBackdropClick
        ignoreEscapeKeyUp
      >
        <CreatePostForm />
      </Modal>
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
