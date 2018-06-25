import React from 'react';
import * as R from 'ramda';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import SettingsIcon from '@material-ui/icons/Settings';
import propSelector from '@pesposa/core/src/utils/propSelector';
import { selectors as authSelectors } from '@pesposa/client-core/src/store/firebase/auth';
import UserImage from '@pesposa/client-core/src/modules/User/UserImage/UserImage';
import UserName from '@pesposa/client-core/src/modules/User/UserName/UserName';
import ListUserProviders from '@pesposa/client-core/src/modules/User/ListUserProviders/ListUserProviders';
import UserCoverImage from '@pesposa/client-core/src/modules/User/UserCoverImage/UserCoverImage';

const styles = theme => ({
  root: {
    height: 300,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: [theme.borderRadius.xl, theme.borderRadius.xl, 0, 0],
    backgroundColor: theme.palette.secondary.dark,
    [theme.breakpoints.down(theme.map.laptop)]: {
      borderRadius: 0,
    },
  },
  content: {
    position: 'relative',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 4 * theme.spacing.unit,
  },
  fullname: {
    marginTop: 2 * theme.spacing.unit,
    color: theme.palette.common.white,
  },
  verifiedTitle: {
    marginTop: 3 * theme.spacing.unit,
    fontSize: '0.75rem',
    color: theme.palette.common.white,
  },
  providers: {
    display: 'flex',
    marginTop: 2 * theme.spacing.unit,
    '& > div + div': {
      marginLeft: 10,
    },
  },
  settingsIcon: {
    display: 'none', // TODO: implement settings
    position: 'absolute',
    top: 2 * theme.spacing.unit,
    right: 2 * theme.spacing.unit,
    width: 28,
    height: 28,
    color: theme.palette.common.white,
  },
});

export const ProfileBanner = ({ userId, userType, isCurrentUser, classes }) => (
  <UserCoverImage userId={userId} userType={userType}>
    {({ src }) => (
      <div
        className={classes.root}
        style={src && { backgroundImage: `url(${src})` }}
      >
        <div className={classes.content}>
          <UserImage userId={userId} userType={userType} size={94} />
          <UserName
            userId={userId}
            userType={userType}
            render={({ name }) => (
              <Typography className={classes.fullname} variant="title">
                {name}
              </Typography>
            )}
          />
          <Typography className={classes.verifiedTitle} variant="button">
            Verified Accounts
          </Typography>
          <ListUserProviders
            className={classes.providers}
            userId={userId}
            canLink={isCurrentUser}
          />
          <SettingsIcon className={classes.settingsIcon} />
        </div>
      </div>
    )}
  </UserCoverImage>
);

const mapStateToProps = createStructuredSelector({
  isCurrentUser: authSelectors.isCurrentUserSelector(propSelector('userId')),
});

export default R.compose(
  connect(mapStateToProps),
  withStyles(styles),
)(ProfileBanner);
