import React from 'react';
import * as R from 'ramda';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { withStateHandlers } from 'recompose';
import { createStructuredSelector } from 'reselect';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';
import TuneIcon from 'material-ui-icons/Tune';
import MenuIcon from 'mdi-react/MenuIcon';
import { selectors as authSelectors } from 'store/firebase/auth';
import { actions as modalActions } from 'store/modals';
import hideUser from 'hocs/hideUser';
import hideVisitor from 'hocs/hideVisitor';
import Link from 'components/Link/Link';
import Button from 'components/Button/Button';
import ShowCreateAdButton from 'components/ShowCreateAdButton/ShowCreateAdButton';
import ProfileImage from 'components/ProfileImage/ProfileImage';
import ReduxModal from 'components/Modal/ReduxModal/ReduxModal';
import WithConversations from 'modules/Messenger/WithConversations/WithConversations';
import Support from 'modules/Support/Support';
import Login from 'modules/Login/Login';
import CreateAd from 'modules/PostAd/CreateAd/CreateAd';
import SearchQuery from 'modules/Search/Query/Query';
import UnreadConversationsBadge from 'modules/Messenger/UnreadConversationsBadge/UnreadConversationsBadge';
import MobileMenu from 'pages/components/Header/MobileMenu/MobileMenu';
import DesktopMenu from './DesktopMenu/DesktopMenu';
import Logo from '../Logo/Logo';

const LoginButton = hideUser(Button);
const MessagesButton = hideVisitor('div');

const styles = theme => ({
  logoLink: {
    color: theme.palette.secondary.main,
    '&:hover': {
      background: 'none',
    },
    [theme.breakpoints.down(theme.map.phone)]: {
      display: 'none',
    },
  },
  logo: {
    width: 115,
    marginBottom: -4,
    height: 48,
  },
  logoText: {
    textTransform: 'uppercase',
  },
  searchInput: {
    flex: '1 1 auto',
    marginLeft: theme.spacing.unit * 2,
    [theme.breakpoints.down(theme.map.phone)]: {
      margin: 0,
    },
  },
  unreadBadge: {
    top: 0,
    right: 1,
    width: 18,
    height: 18,
    fontSize: '0.65rem',
    fontWeight: theme.typography.fontWeightBold,
    background: theme.palette.primary.main,
    color: theme.palette.getContrastText(theme.palette.primary.main),
  },
  mobileUnreadBadge: {
    top: 2,
    right: 2,
  },
  menuButton: {
    display: 'none',
    [theme.breakpoints.down(theme.map.phone)]: {
      display: 'block',
    },
  },
  createAdButton: {
    marginLeft: theme.spacing.unit * 3,
    [theme.breakpoints.down(theme.map.laptop)]: {
      display: 'none',
    },
  },
  loginButton: {
    margin: [0, theme.spacing.unit],
    [theme.breakpoints.down(theme.map.phone)]: {
      display: 'none',
    },
  },
  messagesButton: {
    marginLeft: theme.spacing.unit,
    [theme.breakpoints.down(theme.map.phone)]: {
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
    [theme.breakpoints.down(theme.map.phone)]: {
      display: 'none',
    },
  },
  mobileMenuButton: {
    display: 'none',
    [theme.breakpoints.down(theme.map.phone)]: {
      display: 'block',
    },
  },
});

const Header = ({
  inHome,
  openModal,
  isAuthenticated,
  currentUserId,
  mobileMenuOpened,
  openMobileMenu,
  closeMobileMenu,
  classes,
}) => (
  <WithConversations>
    <React.Fragment>
      <div className={classes.mobileMenuButton}>
        <UnreadConversationsBadge
          classes={{
            badge: classNames(classes.unreadBadge, classes.mobileUnreadBadge),
          }}
        >
          <IconButton onClick={openMobileMenu}>
            {isAuthenticated ? (
              <ProfileImage userId={currentUserId} size="28" />
            ) : (
              <MenuIcon />
            )}
          </IconButton>
        </UnreadConversationsBadge>
      </div>
      <Link to="/" exact className={classes.logoLink}>
        <Logo className={classes.logo} />
      </Link>
      <div className={classes.searchInput}>
        <SearchQuery inHome={inHome} />
      </div>
      <ShowCreateAdButton className={classes.createAdButton} />
      <LoginButton
        className={classes.loginButton}
        color="inherit"
        onClick={() => openModal('login')}
      >
        Login
      </LoginButton>
      {inHome && (
        <IconButton
          className={classes.filtersButton}
          color="inherit"
          onClick={() => openModal('searchFilters')}
        >
          <TuneIcon />
        </IconButton>
      )}
      <MessagesButton className={classes.messagesButton}>
        <UnreadConversationsBadge classes={{ badge: classes.unreadBadge }}>
          <Link to="/messages">Messages</Link>
        </UnreadConversationsBadge>
      </MessagesButton>
      <div className={classes.desktopMenu}>
        <DesktopMenu currentUserId={currentUserId} />
      </div>
      <Drawer open={mobileMenuOpened} onClose={closeMobileMenu}>
        <MobileMenu
          isAuthenticated={isAuthenticated}
          currentUserId={currentUserId}
          onClose={closeMobileMenu}
        />
      </Drawer>
      <ReduxModal id="login" content={Login} />
      <ReduxModal id="createAd" content={CreateAd} />
      <ReduxModal id="support" content={Support} />
    </React.Fragment>
  </WithConversations>
);

const mapStateToProps = createStructuredSelector({
  currentUserId: authSelectors.uidSelector,
  isAuthenticated: authSelectors.isAuthenticatedSelector,
});

const mapDispatchToProps = {
  openModal: modalActions.openModal,
};

export default R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStateHandlers(
    {
      mobileMenuOpened: false,
    },
    {
      openMobileMenu: () => () => ({
        mobileMenuOpened: true,
      }),
      closeMobileMenu: () => () => ({
        mobileMenuOpened: false,
      }),
    },
  ),
  withStyles(styles),
)(Header);
