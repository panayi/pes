import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home';
import MessageIcon from '@material-ui/icons/Message';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { actions as modalActions } from '@pesposa/client-core/src/store/modals';
import CurrentUserBox from '@pesposa/client-core/src/modules/User/CurrentUserBox/CurrentUserBox';
import LogoutButton from '@pesposa/client-core/src/modules/User/LogoutButton/LogoutButton';
import UnreadConversationsBadge from 'modules/Messenger/UnreadConversationsBadge/UnreadConversationsBadge';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  unreadBadge: {
    top: -8,
    right: 6,
    width: 18,
    height: 18,
    fontSize: '0.65rem',
    fontWeight: theme.typography.fontWeightBold,
    background: theme.palette.primary.main,
    color: theme.palette.getContrastText(theme.palette.primary.main),
  },
});

class CurrentUserMobileMenu extends Component {
  static propTypes = {
    classes: PropTypes.shape({}).isRequired,
  };

  navigateTo = path => {
    this.props.history.push(path);
    this.props.onClose();
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
    const { isAuthenticated, currentUserId, classes } = this.props;

    return isAuthenticated ? (
      <React.Fragment>
        <ListItem button onClick={() => this.navigateTo('/messages')}>
          <UnreadConversationsBadge classes={{ badge: classes.unreadBadge }}>
            <ListItemIcon>
              <MessageIcon />
            </ListItemIcon>
          </UnreadConversationsBadge>
          <ListItemText primary="Messages" />
        </ListItem>
        <ListItem
          button
          onClick={() => this.navigateTo(`/user/${currentUserId}`)}
        >
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
          <CurrentUserBox
            isAuthenticated={isAuthenticated}
            currentUserId={currentUserId}
            openModal={this.openModal}
            onClick={() => this.navigateTo(`/user/${currentUserId}`)}
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
              <ListItemText primary="Support" />
            </ListItem>
            <ListItem button onClick={() => this.openModal('rate')}>
              <ListItemText primary="Give us feedback" />
            </ListItem>
            <ListItem button onClick={() => this.navigateTo('/privacy')}>
              <ListItemText primary="Privacy Policy" />
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
)(CurrentUserMobileMenu);
