import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import HomeIcon from 'material-ui-icons/Home';
import { actions as modalActions } from 'store/modals';
import { selectors as authSelectors } from 'store/firebase/auth';
import ProfileImage from 'components/ProfileImage/ProfileImage';
import UserFullName from 'components/UserFullName/UserFullName';
import LogoutButton from '../LogoutButton/LogoutButton';

const PROFILE_IMAGE_SIZE = 96;

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

  navigateTo = path => {
    const { history, closeModal } = this.props;
    history.push(path);
    closeModal();
  };

  closeWithDelay = () => {
    setTimeout(() => {
      this.props.closeModal();
    }, 500);
  };

  openAnotherModal = modalId => {
    this.props.openModal(modalId);
    this.closeWithDelay();
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
      <Button
        component={ListItem}
        button
        onClick={() => this.openAnotherModal('login')}
      >
        <ListItemText primary="Login or Create Account" />
      </Button>
    ) : null;
  }

  renderUserLinks() {
    const { isAuthenticated } = this.props;

    return isAuthenticated ? (
      <React.Fragment>
        <ListItem button onClick={() => this.navigateTo('/messages')}>
          <ListItemText inset primary="Chat" />
        </ListItem>
        <ListItem button onClick={() => this.navigateTo('/profile')}>
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
    const { DialogContent, DialogTitle, classes } = this.props;

    return (
      <React.Fragment>
        <DialogTitle>
          <Typography variant="title" color="inherit">
            Pesposa
          </Typography>
        </DialogTitle>
        <DialogContent>
          <div className={classes.root}>
            <List component="nav">
              <ListItem button onClick={() => this.navigateTo('/')}>
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
              <ListItem
                button
                onClick={() => this.openAnotherModal('createAd')}
              >
                <ListItemText primary="Sell your stuff" />
              </ListItem>
              <Button
                component={ListItem}
                button
                onClick={() => this.openAnotherModal('support')}
              >
                <ListItemText primary="Support / Feedback" />
              </Button>
              {this.renderLogout()}
            </List>
          </div>
        </DialogContent>
      </React.Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUserId: authSelectors.uidSelector,
  isAuthenticated: authSelectors.isAuthenticatedSelector,
});

const mapDispatchToProps = {
  openModal: modalActions.openModal,
};

export default R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  withRouter,
)(Menu);
