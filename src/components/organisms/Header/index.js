import React from 'react';
import * as R from 'ramda';
import { AppBar, Toolbar } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import MessageIcon from 'material-ui-icons/Message';
import hideUser from 'components/hocs/hideUser';
import hideVisitor from 'components/hocs/hideVisitor';
import Link from 'components/atoms/Link';
import ProfileMenu from 'components/molecules/ProfileMenu';
import SearchInput from 'components/molecules/SearchInput';
import CreateAd from 'components/organisms/CreateAd';
import LoginModal from 'components/organisms/LoginModal';

const LoginModalButton = hideUser(LoginModal.showButton);

const MessagesLink = hideVisitor(Link);

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
    alignItems: 'center',
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
        <Link to="/" exact color="contrast">
          Pesposa
        </Link>
      </div>
      <div className={classes.content}>
        <div className={classes.searchInput}>
          <SearchInput />
        </div>
        <CreateAd.showButton color="contrast">
          Sell your stuff
        </CreateAd.showButton>
        <LoginModalButton color="contrast">Login</LoginModalButton>
        <MessagesLink color="contrast" to="/messages" dense>
          <MessageIcon />
        </MessagesLink>
        <ProfileMenu />
      </div>
    </Toolbar>
  </AppBar>
);

export default R.compose(withStyles(styles))(Header);
