import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { NavLink } from 'react-router-dom';
import { DesktopScreen } from 'react-responsive-redux';
import List, {
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import env from '@pesposa/core/src/config/env';
import { selectors as authSelectors } from '../../../store/firebase/auth';
import { selectors as profileSelectors } from '../../../store/firebase/profile';
import A from '../../../components/A/A';
import Link from '../../../components/Link/Link';
import UserImage from '../UserImage/UserImage';
import UserName from '../UserName/UserName';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.up(theme.map.laptop)]: {
      backgroundColor: 'transparent',
    },
  },
  color: {
    color: theme.palette.common.white,
    [theme.breakpoints.up(theme.map.laptop)]: {
      color: theme.palette.text.primary,
    },
  },
  user: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    padding: theme.spacing.unit * 2,
    outline: 'none',
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
  userName: {
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
  links: {
    marginTop: theme.spacing.unit / 2,
  },
  linkSeparator: {
    margin: [0, theme.spacing.unit / 2],
    color: theme.palette.text.secondary,
  },
  profileButton: {
    marginTop: theme.spacing.unit * 2,
  },
});

class CurrentUserBox extends Component {
  static propTypes = {
    email: PropTypes.string,
    classes: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    email: null,
  };

  renderUser() {
    const {
      onClick,
      isAuthenticated,
      email,
      phone,
      currentUserId,
      isAdmin,
      classes,
    } = this.props;

    return isAuthenticated ? (
      <div
        className={classes.user}
        onClick={onClick}
        role="button"
        tabIndex="-1"
      >
        <div className={classes.profileImageWrap}>
          <UserImage
            className={classNames({ [classes.profileImage]: isAuthenticated })}
            userId={currentUserId}
          />
        </div>
        <div className={classes.info}>
          <UserName
            userId={currentUserId}
            render={({ name }) => (
              <Typography className={classes.userName} color="inherit">
                {name}
              </Typography>
            )}
          />
          {email && (
            <Typography className={classes.smallText} variant="caption">
              {email}
            </Typography>
          )}
          {phone && (
            <Typography className={classes.smallText} variant="caption">
              {phone}
            </Typography>
          )}
          <DesktopScreen>
            <div className={classes.links}>
              {isAdmin ? (
                <React.Fragment>
                  {env.isManagerApp ? (
                    <A href="/">App</A>
                  ) : (
                    <A href="/manager">Manager</A>
                  )}
                  <span className={classes.linkSeparator}>–</span>
                </React.Fragment>
              ) : null}
              <A component={NavLink} to="/privacy">
                Privacy
              </A>
            </div>
          </DesktopScreen>
          <DesktopScreen>
            <Link
              className={classes.profileButton}
              to={`/user/${currentUserId}`}
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
  isAdmin: authSelectors.isAdminSelector,
  email: profileSelectors.profileEmailSelector,
  phone: profileSelectors.profilePhoneSelector,
});

export default R.compose(
  connect(mapStateToProps),
  withStyles(styles),
)(CurrentUserBox);
