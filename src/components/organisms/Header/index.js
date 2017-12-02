import React from 'react';
import * as R from 'ramda';
import { AppBar, Toolbar } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import hideUser from 'components/hocs/hideUser';
import hideVisitor from 'components/hocs/hideVisitor';
import logoutHoc from 'components/hocs/logout/logout';
import Link from 'components/molecules/Link';
import ProfileImage from 'components/molecules/ProfileImage';
import SearchInput from 'components/molecules/SearchInput';
import CreatePost from 'components/organisms/CreatePost';
import LoginModal from 'components/organisms/LoginModal';

const LoginModalButton = hideUser(LoginModal.showButton);

const ProfileLink = hideVisitor(Link);

const LogoutLink = R.compose(
  hideVisitor,
  logoutHoc,
)(Link);

const styles = theme => ({
  header: {
    boxShadow: 'none',
  },
  toolbar: {
    padding: 0,
  },
  logoArea: {
    flex: `0 0 ${theme.custom.sidebarWidth}px`,
  },
  content: {
    display: 'flex',
    flex: '1 1 auto',
  },
  searchInput: {
    flex: '1 1 auto',
    marginRight: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
  },
});

const Header = ({ classes }) => (
  <AppBar className={classes.header}>
    <Toolbar className={classes.toolbar}>
      <div className={classes.logoArea}>
        <Link
          to="/"
          exact
          color="contrast"
        >
          Pesposa
        </Link>
      </div>
      <div className={classes.content}>
        <div className={classes.searchInput}>
          <SearchInput />
        </div>
        <CreatePost.showButton
          color="contrast"
        >
          Sell your stuff
        </CreatePost.showButton>
        <LoginModalButton color="contrast">
          Login
        </LoginModalButton>
        <LogoutLink color="contrast">
          Logout
        </LogoutLink>
        <ProfileLink
          to="/profile"
          color="contrast"
        >
          <ProfileImage.Avatar />
        </ProfileLink>
      </div>
    </Toolbar>
  </AppBar>
);

export default R.compose(
  withStyles(styles),
)(Header);
