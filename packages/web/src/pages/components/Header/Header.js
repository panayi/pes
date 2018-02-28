import React from 'react';
import * as R from 'ramda';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import MessageIcon from 'material-ui-icons/Message';
import TuneIcon from 'material-ui-icons/Tune';
import MenuIcon from 'mdi-react/MenuIcon';
import { modals } from 'store/modals';
import hideUser from 'hocs/hideUser';
import hideVisitor from 'hocs/hideVisitor';
import Link from 'components/Link/Link';
import SearchQuery from 'modules/Search/Query/Query';
import UnreadConversationsBadge from 'modules/Messenger/UnreadConversationsBadge/UnreadConversationsBadge';
import DesktopMenu from './DesktopMenu/DesktopMenu';

const ShowLoginButton = hideUser(modals.login.showButton);
const ToggleMobileMenuIconButton = modals.menu.toggleIconButton;
const ShowCreateAdButton = modals.createAd.showButton;
const ToggleFiltersIconButton = modals.filters.toggleIconButton;
const MessagesLink = hideVisitor(Link.icon);

const styles = theme => ({
  header: {
    boxShadow: 'none',
  },
  toolbar: {
    display: 'flex',
    flex: '1 1 auto',
    padding: 0,
  },
  logoArea: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  logoText: {
    textTransform: 'uppercase',
    color: theme.palette.common.white,
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
  menuButton: {
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
  createAdButton: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  loginButton: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  messagesButton: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  filtersButton: {
    display: 'none',
    [theme.breakpoints.down(theme.layout.breakpoints.filtersDialog)]: {
      display: 'block',
    },
  },
  desktopMenu: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  mobileMenuButton: {
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
  menuIcon: {
    fill: theme.palette.common.white,
  },
});

const Header = ({ inHome, classes }) => (
  <AppBar className={classes.header}>
    <Toolbar className={classes.toolbar}>
      <div className={classes.mobileMenuButton}>
        <ToggleMobileMenuIconButton>
          <MenuIcon className={classes.menuIcon} />
        </ToggleMobileMenuIconButton>
      </div>
      <div className={classes.logoArea}>
        <Link to="/" exact>
          <Typography className={classes.logoText} variant="title">
            Pesposa
          </Typography>
        </Link>
      </div>
      <div className={classes.searchInput}>
        <SearchQuery inHome={inHome} />
      </div>
      <ShowCreateAdButton className={classes.createAdButton} color="inherit">
        Sell your stuff
      </ShowCreateAdButton>
      <ShowLoginButton className={classes.loginButton} color="inherit">
        Login
      </ShowLoginButton>
      {inHome && (
        <ToggleFiltersIconButton
          className={classes.filtersButton}
          color="inherit"
        >
          <TuneIcon />
        </ToggleFiltersIconButton>
      )}
      <div className={classes.messagesButton}>
        <UnreadConversationsBadge
          color="secondary"
          classes={{ badge: classes.unreadBadge }}
        >
          <MessagesLink color="inherit" to="/messages" size="small">
            <MessageIcon />
          </MessagesLink>
        </UnreadConversationsBadge>
      </div>
      <div className={classes.desktopMenu}>
        <DesktopMenu />
      </div>
    </Toolbar>
  </AppBar>
);

export default R.compose(withStyles(styles))(Header);
