import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';
import MessageIcon from 'material-ui-icons/Message';
import TuneIcon from 'material-ui-icons/Tune';
import MenuIcon from 'mdi-react/MenuIcon';
import { actions as modalActions } from 'store/modals';
import hideUser from 'hocs/hideUser';
import hideVisitor from 'hocs/hideVisitor';
import Link from 'components/Link/Link';
import ReduxModal from 'components/Modal/ReduxModal/ReduxModal';
import Support from 'modules/Support/Support';
import Login from 'modules/Login/Login';
import CreateAd from 'modules/PostAd/CreateAd/CreateAd';
import SearchQuery from 'modules/Search/Query/Query';
import UnreadConversationsBadge from 'modules/Messenger/UnreadConversationsBadge/UnreadConversationsBadge';
import MobileMenu from 'pages/components/Header/MobileMenu/MobileMenu';
import DesktopMenu from './DesktopMenu/DesktopMenu';

const LoginButton = hideUser(Button);
const MessagesLink = hideVisitor(Link.icon);

const styles = theme => ({
  logoArea: {
    [theme.breakpoints.down(theme.map.phone)]: {
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
    [theme.breakpoints.down(theme.map.phone)]: {
      display: 'none',
    },
  },
  messagesButton: {
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
  menuIcon: {
    fill: theme.palette.common.white,
  },
});

const Header = ({ inHome, openModal, toggleModal, classes }) => (
  <React.Fragment>
    <div className={classes.mobileMenuButton}>
      <IconButton onClick={() => toggleModal('mobileMenu')}>
        <MenuIcon className={classes.menuIcon} />
      </IconButton>
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
    <Button
      className={classes.createAdButton}
      color="inherit"
      onClick={() => openModal('createAd')}
    >
      Sell your stuff
    </Button>
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
