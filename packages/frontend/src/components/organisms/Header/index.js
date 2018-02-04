import React from 'react';
import * as R from 'ramda';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import MessageIcon from 'material-ui-icons/Message';
import hideUser from 'components/hocs/hideUser';
import hideVisitor from 'components/hocs/hideVisitor';
import Link from 'components/atoms/Link';
import ProfileMenu from 'components/molecules/ProfileMenu';
import SearchAds from 'components/organisms/SearchAds';
import CreateAd from 'components/organisms/CreateAd';
import Login from 'components/organisms/Login';

const ShowLoginButton = hideUser(Login.showButton);

const MessagesLink = hideVisitor(Link);

const styles = theme => ({
  header: {
    boxShadow: 'none',
  },
  toolbar: {
    padding: 0,
  },
  logoArea: {
    flex: `0 0 ${theme.layout.sidebarWidth}px`,
  },
  logoText: {
    textTransform: 'uppercase',
    color: theme.palette.common.white,
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
        <Link to="/" exact>
          <Typography className={classes.logoText} type="title">
            Pesposa
          </Typography>
        </Link>
      </div>
      <div className={classes.content}>
        <div className={classes.searchInput}>
          <SearchAds.Query />
        </div>
        <CreateAd.showButton color="inherit">
          Sell your stuff
        </CreateAd.showButton>
        <ShowLoginButton color="inherit">Login</ShowLoginButton>
        <MessagesLink color="inherit" to="/messages" size="small">
          <MessageIcon />
        </MessagesLink>
        <ProfileMenu />
      </div>
    </Toolbar>
  </AppBar>
);

export default R.compose(withStyles(styles))(Header);
