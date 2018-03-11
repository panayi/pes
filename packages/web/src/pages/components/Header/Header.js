import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';
import TuneIcon from 'material-ui-icons/Tune';
import MenuIcon from 'mdi-react/MenuIcon';
import { actions as modalActions } from 'store/modals';
import hideUser from 'hocs/hideUser';
import hideVisitor from 'hocs/hideVisitor';
import Link from 'components/Link/Link';
import RoundButton from 'components/RoundButton/RoundButton';
import ReduxModal from 'components/Modal/ReduxModal/ReduxModal';
import Support from 'modules/Support/Support';
import Login from 'modules/Login/Login';
import CreateAd from 'modules/PostAd/CreateAd/CreateAd';
import SearchQuery from 'modules/Search/Query/Query';
import UnreadConversationsBadge from 'modules/Messenger/UnreadConversationsBadge/UnreadConversationsBadge';
import MobileMenu from 'pages/components/Header/MobileMenu/MobileMenu';
import DesktopMenu from './DesktopMenu/DesktopMenu';
import Logo from './Logo/Logo';

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
    marginRight: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit,
    [theme.breakpoints.down(theme.map.phone)]: {
      margin: 0,
    },
  },
  unreadBadge: {
    top: 0,
    right: 0,
    width: 18,
    height: 18,
    fontSize: '0.65rem',
    background: theme.palette.secondary.main,
    color: theme.palette.getContrastText(theme.palette.secondary.main),
  },
  menuButton: {
    display: 'none',
    [theme.breakpoints.down(theme.map.phone)]: {
      display: 'block',
    },
  },
  createAdButton: {
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
    margin: [0, theme.spacing.unit],
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

const Header = ({ inHome, openModal, toggleModal, classes }) => (
  <React.Fragment>
    <div className={classes.mobileMenuButton}>
      <IconButton onClick={() => toggleModal('mobileMenu')}>
        <MenuIcon />
      </IconButton>
    </div>
    <Link to="/" exact className={classes.logoLink}>
      <Logo className={classes.logo} />
    </Link>
    <div className={classes.searchInput}>
      <SearchQuery inHome={inHome} />
    </div>
    <RoundButton
      className={classes.createAdButton}
      color="primary"
      variant="raised"
      onClick={() => openModal('createAd')}
    >
      Sell your stuff
    </RoundButton>
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
      <UnreadConversationsBadge
        color="secondary"
        classes={{ badge: classes.unreadBadge }}
      >
        <Link to="/messages">Messages</Link>
      </UnreadConversationsBadge>
    </MessagesButton>
    <div className={classes.desktopMenu}>
      <DesktopMenu />
    </div>
    <ReduxModal id="login" content={Login} closeButton />
    <ReduxModal id="createAd" content={CreateAd} />
    <ReduxModal id="support" content={Support} />
    <ReduxModal id="mobileMenu" content={MobileMenu} />
  </React.Fragment>
);

const mapDispatchToProps = {
  openModal: modalActions.openModal,
  toggleModal: modalActions.toggleModal,
};

export default R.compose(connect(null, mapDispatchToProps), withStyles(styles))(
  Header,
);
