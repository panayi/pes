import React from 'react';
import * as R from 'ramda';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { withStateHandlers } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { DesktopScreen, MobileScreen } from 'react-responsive-redux';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import withStyles from '@material-ui/core/styles/withStyles';
import TuneIcon from '@material-ui/icons/Tune';
import MenuIcon from 'mdi-react/MenuIcon';
import * as pesposaConfig from '@pesposa/core/src/config/pesposa';
import { selectors as authSelectors } from '@pesposa/client-core/src/store/firebase/auth';
import { actions as modalActions } from '@pesposa/client-core/src/store/modals';
import hideVisitor from '@pesposa/client-core/src/hocs/hideVisitor';
import Link from '@pesposa/client-core/src/components/Link/Link';
import Button from '@pesposa/client-core/src/components/Button/Button';
import ReduxModal from '@pesposa/client-core/src/components/Modal/ReduxModal/ReduxModal';
import CurrentUserMenu from '@pesposa/client-core/src/modules/User/CurrentUserMenu/CurrentUserMenu';
import UserImage from '@pesposa/client-core/src/modules/User/UserImage/UserImage';
import SearchQuery from '@pesposa/client-core/src/modules/Search/Query/Query';
import hideUser from 'hocs/hideUser';
import ShowCreateAdButton from 'modules/PostAd/ShowCreateAdButton/ShowCreateAdButton';
import WithConversations from 'modules/Messenger/WithConversations/WithConversations';
import UnreadConversationsBadge from 'modules/Messenger/UnreadConversationsBadge/UnreadConversationsBadge';
import Support from 'modules/Support/Support';
import CreateAd from 'modules/PostAd/CreateAd/CreateAd';
import Rate from 'modules/Rate/Rate';
import CurrentUserMobileMenu from './CurrentUserMobileMenu/CurrentUserMobileMenu';
import HeaderLogo from '../HeaderLogo/HeaderLogo';

const LoginButton = hideUser(Button);
const MessagesButton = hideVisitor('div');

const styles = theme => ({
  searchInput: {
    flex: '1 1 auto',
    marginRight: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 2,
    [theme.breakpoints.down(theme.map.tablet)]: {
      marginRight: theme.spacing.unit * 2,
      marginLeft: 0,
    },
  },
  searchInputHome: {
    [theme.breakpoints.down(theme.map.tablet)]: {
      marginRight: 0,
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
  button: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  },
  helpButton: {
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
              <UserImage userId={currentUserId} size="28" />
            ) : (
              <MenuIcon />
            )}
          </IconButton>
        </UnreadConversationsBadge>
      </MobileScreen>
      <HeaderLogo />
      <div
        className={classNames(classes.searchInput, {
          [classes.searchInputHome]: inHome,
        })}
      >
        <SearchQuery inHome={inHome} />
      </div>
      <DesktopScreen>
        <ShowCreateAdButton />
      </DesktopScreen>
      <DesktopScreen>
        <Button
          href={pesposaConfig.HELPDESK_URL}
          target="_blank"
          component="a"
          className={classNames(classes.button, classes.helpButton)}
        >
          Help
        </Button>
      </DesktopScreen>
      <DesktopScreen>
        <LoginButton
          className={classes.button}
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
        <MessagesButton className={classes.button}>
          <UnreadConversationsBadge classes={{ badge: classes.unreadBadge }}>
            <Link to="/messages">Messages</Link>
          </UnreadConversationsBadge>
        </MessagesButton>
      </DesktopScreen>
      <DesktopScreen>
        <CurrentUserMenu />
      </DesktopScreen>
      <Drawer open={mobileMenuOpened} onClose={closeMobileMenu}>
        <CurrentUserMobileMenu
          isAuthenticated={isAuthenticated}
          currentUserId={currentUserId}
          onClose={closeMobileMenu}
        />
      </Drawer>
      <ReduxModal id="createAd" content={CreateAd} />
      <ReduxModal id="support" content={Support} />
      <Rate currentUserId={currentUserId} />
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
