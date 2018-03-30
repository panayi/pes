import React from 'react';
import * as R from 'ramda';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { withStateHandlers } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { DesktopScreen, MobileScreen } from 'react-responsive-redux';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import withStyles from 'material-ui/styles/withStyles';
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
import Logo from 'components/Logo/Logo';
import WithConversations from 'modules/Messenger/WithConversations/WithConversations';
import UnreadConversationsBadge from 'modules/Messenger/UnreadConversationsBadge/UnreadConversationsBadge';
import Support from 'modules/Support/Support';
import CreateAd from 'modules/PostAd/CreateAd/CreateAd';
import SearchQuery from 'modules/Search/Query/Query';
import Rate from 'modules/Rate/Rate';
import MobileMenu from 'pages/components/Header/MobileMenu/MobileMenu';
import DesktopMenu from './DesktopMenu/DesktopMenu';

const LoginButton = hideUser(Button);
const MessagesButton = hideVisitor('div');

const styles = theme => ({
  logoLink: {
    color: theme.palette.secondary.main,
    '&:hover': {
      background: 'none',
    },
    [theme.breakpoints.down(theme.map.tablet)]: {
      paddingLeft: 0,
      paddingRight: theme.spacing.unit * 1.5,
    },
    '@media (max-width: 320px)': {
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
    [theme.breakpoints.down(theme.map.tablet)]: {
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
  createAdButton: {
    marginLeft: theme.spacing.unit * 3,
  },
  loginButton: {
    margin: [0, theme.spacing.unit],
  },
  messagesButton: {
    marginLeft: theme.spacing.unit,
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
      <MobileScreen>
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
      </MobileScreen>
      <Link to="/" exact className={classes.logoLink}>
        <Logo className={classes.logo} />
      </Link>
      <div className={classes.searchInput}>
        <SearchQuery inHome={inHome} />
      </div>
      <DesktopScreen>
        <ShowCreateAdButton className={classes.createAdButton} />
      </DesktopScreen>
      <DesktopScreen>
        <LoginButton
          className={classes.loginButton}
          color="inherit"
          onClick={() => openModal('login')}
        >
          Login
        </LoginButton>
      </DesktopScreen>
      <MobileScreen>
        {inHome && (
          <IconButton
            color="inherit"
            onClick={() => openModal('searchFilters')}
          >
            <TuneIcon />
          </IconButton>
        )}
      </MobileScreen>
      <DesktopScreen>
        <MessagesButton className={classes.messagesButton}>
          <UnreadConversationsBadge classes={{ badge: classes.unreadBadge }}>
            <Link to="/messages">Messages</Link>
          </UnreadConversationsBadge>
        </MessagesButton>
      </DesktopScreen>
      <DesktopScreen>
        <DesktopMenu currentUserId={currentUserId} />
      </DesktopScreen>
      <Drawer open={mobileMenuOpened} onClose={closeMobileMenu}>
        <MobileMenu
          isAuthenticated={isAuthenticated}
          currentUserId={currentUserId}
          onClose={closeMobileMenu}
        />
      </Drawer>
      <ReduxModal id="createAd" content={CreateAd} />
      <ReduxModal id="support" content={Support} />
      <Rate />
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
