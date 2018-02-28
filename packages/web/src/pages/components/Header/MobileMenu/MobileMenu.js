import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import HomeIcon from 'material-ui-icons/Home';
import { modals } from 'store/modals';
import { selectors as authSelectors } from 'store/firebase/auth';
import ProfileImage from 'components/ProfileImage/ProfileImage';
import UserFullName from 'components/UserFullName/UserFullName';
import LogoutButton from '../LogoutButton/LogoutButton';

const PROFILE_IMAGE_SIZE = 96;

const ShowLoginButton = modals.login.showButton;
const ShowSupportButton = modals.support.showButton;

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    display: 'flex',
    flex: 1,
    margin: theme.spacing.unit * 2,
  },
  menuIcon: {
    fill: theme.palette.common.white,
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    borderTop: `1px solid ${theme.palette.divider}`,
    background: theme.palette.background.default,
  },
  imageWrap: {
    flexBasis: PROFILE_IMAGE_SIZE,
    alignSelf: 'flex-end',
    marginRight: theme.spacing.unit * 2,
  },
  displayName: {
    fontWeight: 500,
  },
  supportButton: {
    textTransform: 'none',
  },
  logoutButton: {
    border: `1px solid ${theme.palette.grey[400]}`,
  },
  small: {
    fontSize: '0.8125rem',
    color: theme.palette.text.secondary,
  },
  profileLink: {
    marginTop: theme.spacing.unit,
  },
});

class Menu extends Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
  };

  goHome = () => {
    const { history, hideModal } = this.props;
    history.push('/');
    hideModal();
  };

  renderProfileImage() {
    const { currentUserId, isAuthenticated, classes } = this.props;

    return isAuthenticated ? (
      <ListItem button>
        <ListItemIcon>
          <ProfileImage userId={currentUserId} size="24" />
        </ListItemIcon>
        <ListItemText
          primary={
            <UserFullName
              className={classes.displayName}
              userId={currentUserId}
            />
          }
        />
      </ListItem>
    ) : null;
  }

  renderLogin() {
    const { isAuthenticated } = this.props;

    return !isAuthenticated ? (
      <ShowLoginButton component={ListItem} button>
        <ListItemText primary="Login or Create Account" />
      </ShowLoginButton>
    ) : null;
  }

  renderUserLinks() {
    const { isAuthenticated } = this.props;

    return isAuthenticated ? (
      <React.Fragment>
        <ListItem button>
          <ListItemText inset primary="Chat" />
        </ListItem>
        <ListItem button>
          <ListItemText inset primary="My Profile" />
        </ListItem>
      </React.Fragment>
    ) : null;
  }

  renderLogout() {
    const { isAuthenticated } = this.props;

    return isAuthenticated ? (
      <LogoutButton component={ListItem} button>
        <ListItemText primary="Logout" />
      </LogoutButton>
    ) : null;
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List component="nav">
          <ListItem button onClick={this.goHome}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </List>
        <Divider />
        <List component="nav">
          {this.renderLogin()}
          {this.renderProfileImage()}
          {this.renderUserLinks()}
        </List>
        <Divider />
        <List component="nav">
          <ListItem button>
            <ListItemText primary="Sell your stuff" />
          </ListItem>
          <ShowSupportButton component={ListItem} button>
            <ListItemText primary="Support / Feedback" />
          </ShowSupportButton>
          {this.renderLogout()}
        </List>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUserId: authSelectors.uidSelector,
  isAuthenticated: authSelectors.isAuthenticatedSelector,
});

export default R.compose(
  connect(mapStateToProps),
  withStyles(styles),
  withRouter,
)(Menu);
