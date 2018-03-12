import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import HomeIcon from 'material-ui-icons/Home';
import MessageIcon from 'material-ui-icons/Message';
import AccountCircleIcon from 'material-ui-icons/AccountCircle';
import { actions as modalActions } from 'store/modals';
import Button from 'components/Button/Button';
import ProfileBox from '../ProfileBox/ProfileBox';
import LogoutButton from '../LogoutButton/LogoutButton';

const PROFILE_IMAGE_SIZE = 96;

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  login: {
    display: 'flex',
    alignItems: 'center',
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
    this.props.history.push(path);
  };

  closeWithDelay = () => {
    setTimeout(() => {
      this.props.onClose();
    }, 500);
  };

  openModal = modalId => {
    this.props.openModal(modalId);
    this.closeWithDelay();
  };

  renderUserLinks() {
    const { isAuthenticated } = this.props;

    return isAuthenticated ? (
      <React.Fragment>
        <List component="nav">
          <ListItem button onClick={() => this.navigateTo('/messages')}>
            <ListItemIcon>
              <MessageIcon />
            </ListItemIcon>
            <ListItemText primary="Messages" />
          </ListItem>
          <ListItem button onClick={() => this.navigateTo('/profile')}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="My Profile" />
          </ListItem>
        </List>
        <Divider />
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
    const { isAuthenticated, currentUserId, classes } = this.props;

    return (
      <React.Fragment>
        <div className={classes.root}>
          <ProfileBox
            isAuthenticated={isAuthenticated}
            currentUserId={currentUserId}
            openModal={this.openModal}
          />
          <List component="nav">
            <ListItem button onClick={() => this.navigateTo('/')}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </List>
          <Divider />
          {this.renderUserLinks()}
          <List component="nav">
            <ListItem button onClick={() => this.openModal('createAd')}>
              <ListItemText primary="Sell your stuff" />
            </ListItem>
            <Button
              component={ListItem}
              button
              onClick={() => this.openModal('support')}
            >
              <ListItemText primary="Support / Feedback" />
            </Button>
            {this.renderLogout()}
          </List>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = {
  openModal: modalActions.openModal,
};

export default R.compose(
  connect(null, mapDispatchToProps),
  withStyles(styles),
  withRouter,
)(Menu);
