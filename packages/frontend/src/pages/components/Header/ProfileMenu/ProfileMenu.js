import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Popover from 'material-ui/Popover';
import { selectors as authSelectors } from 'store/firebase/auth';
import { selectors as profileSelectors } from 'store/firebase/profile';
import hideVisitor from 'hocs/hideVisitor';
import Link from 'components/Link/Link';
import ProfileImage from 'components/ProfileImage/ProfileImage';
import UserFullName from 'components/UserFullName/UserFullName';
import LogoutButton from './LogoutButton/LogoutButton';

const PROFILE_IMAGE_SIZE = 96;

const styles = theme =>
  !console.log(theme) && {
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      display: 'flex',
      flex: 1,
      margin: theme.spacing.unit * 2,
    },
    footer: {
      flexBasis: 32,
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
      fontWeight: 600,
    },
    logoutButton: {
      float: 'right',
      border: `1px solid ${theme.palette.grey[400]}`,
    },
    small: {
      fontSize: '0.8125rem',
      color: theme.palette.text.secondary,
    },
    profileLink: {
      marginTop: theme.spacing.unit,
    },
  };

class ProfileMenu extends Component {
  static propTypes = {
    email: PropTypes.string,
    classes: PropTypes.shape().isRequired,
  };

  static defaultProps = {
    email: null,
  };

  state = {
    open: false,
    anchorEl: null,
  };

  handleClickAnchor = event => {
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  button = null;

  render() {
    const { currentUserId, email, phoneNumber, classes } = this.props;
    const { open, anchorEl } = this.state;

    return [
      <Button key="anchor" size="small" onClick={this.handleClickAnchor}>
        <ProfileImage userId={currentUserId} withDefault />
      </Button>,
      <Popover
        key="content"
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
      >
        <div className={classes.root}>
          <div className={classes.content}>
            <div className={classes.imageWrap}>
              <ProfileImage
                size={PROFILE_IMAGE_SIZE}
                userId={currentUserId}
                withDefault
              />
            </div>
            <div>
              <UserFullName
                className={classes.displayName}
                userId={currentUserId}
              />
              <Typography className={classes.small}>{email}</Typography>
              <Typography className={classes.small}>{phoneNumber}</Typography>
              <Link
                className={classes.profileLink}
                to="/profile"
                variant="raised"
                color="primary"
              >
                My Profile
              </Link>
            </div>
          </div>
          <div className={classes.footer}>
            <LogoutButton className={classes.logoutButton} dense>
              Sign out
            </LogoutButton>
          </div>
        </div>
      </Popover>,
    ];
  }
}

const mapStateToProps = createStructuredSelector({
  currentUserId: authSelectors.uidSelector,
  email: profileSelectors.profileEmailSelector,
  phoneNumber: profileSelectors.profilePhoneNumberSelector,
});

export default R.compose(
  hideVisitor,
  connect(mapStateToProps),
  withStyles(styles),
)(ProfileMenu);
