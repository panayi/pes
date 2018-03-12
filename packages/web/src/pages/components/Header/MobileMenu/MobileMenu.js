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
import ProfileBox from '../ProfileBox/ProfileBox';
import LogoutButton from '../LogoutButton/LogoutButton';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
};

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
            {this.renderUserLinks()}
          </List>
          <Divider />
          <List component="nav">
            <ListItem button onClick={() => this.openModal('createAd')}>
              <ListItemText primary="Sell on Pesposa" />
            </ListItem>
          </List>
          <Divider />
          <List component="nav">
            <ListItem button onClick={() => this.openModal('support')}>
              <ListItemText primary="Support / Feedback" />
            </ListItem>
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
