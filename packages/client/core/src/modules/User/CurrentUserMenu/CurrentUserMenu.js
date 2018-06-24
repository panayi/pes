import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Popover from '@material-ui/core/Popover';
import withStyles from '@material-ui/core/styles/withStyles';
import { actions as modalActions } from '../../../store/modals';
import { selectors as authSelectors } from '../../../store/firebase/auth';
import hideVisitor from '../../../hocs/hideVisitor';
import Button from '../../../components/Button/Button';
import UserImage from '../UserImage/UserImage';
import CurrentUserBox from '../CurrentUserBox/CurrentUserBox';
import LogoutButton from '../LogoutButton/LogoutButton';

const PROFILE_IMAGE_SIZE = 96;

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
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
  supportButton: {
    marginRight: theme.spacing.unit,
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

class CurrentUserMenu extends Component {
  button = null;

  static propTypes = {
    classes: PropTypes.shape({}).isRequired,
  };

  state = {
    open: false,
    anchorEl: null,
  };

  handleAnchorClick = event => {
    const anchorEl = event.currentTarget;
    this.setState(({ open }) => ({
      open: !open,
      anchorEl,
    }));
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const { currentUserId, openModal, classes } = this.props;
    const { open, anchorEl } = this.state;

    return (
      <React.Fragment>
        <Button
          className={classes.profileButton}
          size="small"
          onClick={this.handleAnchorClick}
          title="Profile"
        >
          <UserImage userId={currentUserId} />
        </Button>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          marginThreshold={8}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          elevation={20}
        >
          <div className={classes.root}>
            <CurrentUserBox currentUserId={currentUserId} isAuthenticated />
            <div className={classes.footer}>
              <Button
                className={classes.supportButton}
                onClick={() => openModal('support')}
              >
                Help / Feedback
              </Button>
              <LogoutButton className={classes.logoutButton} size="small">
                Sign out
              </LogoutButton>
            </div>
          </div>
        </Popover>
      </React.Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUserId: authSelectors.uidSelector,
});

const mapDispatchToProps = {
  openModal: modalActions.openModal,
};

export default R.compose(
  hideVisitor,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withStyles(styles),
)(CurrentUserMenu);
