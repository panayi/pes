import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { NavLink } from 'react-router-dom';
import { DesktopScreen } from 'react-responsive-redux';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import withStyles from 'material-ui/styles/withStyles';
import { lighten } from 'material-ui/styles/colorManipulator';
import AccountCircleIcon from 'material-ui-icons/AccountCircle';
import { selectors as profileSelectors } from 'store/firebase/profile';
import Link from 'components/Link/Link';
import ProfileImage from 'components/ProfileImage/ProfileImage';
import UserFullName from 'components/UserFullName/UserFullName';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.up(theme.map.tablet)]: {
      backgroundColor: 'transparent',
    },
  },
  color: {
    color: theme.palette.common.white,
    [theme.breakpoints.up(theme.map.tablet)]: {
      color: theme.palette.text.primary,
    },
  },
  user: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    padding: theme.spacing.unit * 2,
  },
  profileImageWrap: {
    flexBasis: 64,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(theme.map.tablet)]: {
      flexBasis: 96,
    },
  },
  profileImage: {
    width: '64px !important',
    height: '64px !important',
    [theme.breakpoints.up(theme.map.tablet)]: {
      width: '96px !important',
      height: '96px !important',
    },
  },
  loginButton: {
    whiteSpace: 'nowrap',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
  },
  displayName: {
    fontWeight: 600,
  },
  smallText: {
    '& + $smallText': {
      paddingTop: 2,
    },
    [theme.breakpoints.down(theme.map.tablet)]: {
      color: lighten(theme.palette.primary.main, 0.9),
    },
  },
  privacyLink: {
    color: theme.palette.primary.main,
    textDecoration: 'underline',
  },
  profileLink: {
    marginTop: theme.spacing.unit * 2,
  },
});

class ProfileBox extends Component {
  static propTypes = {
    email: PropTypes.string,
    classes: PropTypes.shape().isRequired,
  };

  static defaultProps = {
    email: null,
  };

  renderUser() {
    const {
      isAuthenticated,
      email,
      phoneNumber,
      currentUserId,
      classes,
    } = this.props;

    return isAuthenticated ? (
      <div className={classes.user}>
        <div className={classes.profileImageWrap}>
          <ProfileImage
            className={classNames({ [classes.profileImage]: isAuthenticated })}
            userId={currentUserId}
          />
        </div>
        <div className={classes.info}>
          <UserFullName
            userId={currentUserId}
            render={({ userFullName }) => (
              <Typography className={classes.displayName} color="inherit">
                {userFullName}
              </Typography>
            )}
          />
          {email && (
            <Typography className={classes.smallText} variant="caption">
              {email}
            </Typography>
          )}
          {phoneNumber && (
            <Typography className={classes.smallText} variant="caption">
              {phoneNumber}
            </Typography>
          )}
          <DesktopScreen>
            <Typography
              className={classes.privacyLink}
              component={NavLink}
              to="/privacy"
            >
              Privacy
            </Typography>
          </DesktopScreen>
          <DesktopScreen>
            <Link
              className={classes.profileLink}
              to="/profile"
              variant="raised"
              size="small"
              color="primary"
            >
              My Profile
            </Link>
          </DesktopScreen>
        </div>
      </div>
    ) : null;
  }

  renderLogin() {
    const { isAuthenticated, openModal, classes } = this.props;
    return isAuthenticated ? null : (
      <List component="nav">
        <ListItem button onClick={() => openModal('login')}>
          <ListItemIcon className={classes.color}>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.color }}
            primary="Login to Pesposa"
          />
        </ListItem>
      </List>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classNames(classes.root, classes.color)}>
        {this.renderUser()}
        {this.renderLogin()}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  email: profileSelectors.profileEmailSelector,
  phoneNumber: profileSelectors.profilePhoneNumberSelector,
});

export default R.compose(connect(mapStateToProps), withStyles(styles))(
  ProfileBox,
);
