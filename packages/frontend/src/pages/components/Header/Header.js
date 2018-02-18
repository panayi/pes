import React from 'react';
import * as R from 'ramda';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import MessageIcon from 'material-ui-icons/Message';
import { modals } from 'store/modals';
import hideUser from 'hocs/hideUser';
import hideVisitor from 'hocs/hideVisitor';
import Link from 'components/Link/Link';
import SearchQuery from 'modules/Search/Query/Query';
import UnreadConversationsBadge from 'modules/Messenger/UnreadConversationsBadge/UnreadConversationsBadge';
import ProfileMenu from './ProfileMenu';

const ShowLoginButton = hideUser(modals.login.showButton);

const ShowCreateAdButton = modals.createAd.showButton;

const MessagesLink = hideVisitor(Link.icon);

const styles = theme => ({
  header: {
    boxShadow: 'none',
  },
  toolbar: {
    padding: 0,
  },
  logoArea: {
    flex: [0, 0, theme.layout.sidebarWidth],
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
  unreadBadge: {
    top: 0,
    right: 0,
    width: 18,
    height: 18,
    fontSize: '0.65rem',
    background: theme.palette.secondary.A400,
    color: theme.palette.getContrastText(theme.palette.secondary.A400),
  },
});

const Header = ({ classes }) => (
  <AppBar className={classes.header}>
    <Toolbar className={classes.toolbar}>
      <div className={classes.logoArea}>
        <Link to="/" exact>
          <Typography className={classes.logoText} variant="title">
            Pesposa
          </Typography>
        </Link>
      </div>
      <div className={classes.content}>
        <div className={classes.searchInput}>
          <SearchQuery />
        </div>
        <ShowCreateAdButton color="inherit">Sell your stuff</ShowCreateAdButton>
        <ShowLoginButton color="inherit">Login</ShowLoginButton>
        <UnreadConversationsBadge
          color="secondary"
          classes={{ badge: classes.unreadBadge }}
        >
          <MessagesLink color="inherit" to="/messages" size="small">
            <MessageIcon />
          </MessagesLink>
        </UnreadConversationsBadge>
        <ProfileMenu />
      </div>
    </Toolbar>
  </AppBar>
);

export default R.compose(withStyles(styles))(Header);
