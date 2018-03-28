import React from 'react';
import * as R from 'ramda';
import { createStructuredSelector } from 'reselect';
import Typography from 'material-ui/Typography';
import withStyles from 'material-ui/styles/withStyles';
import SettingsIcon from 'material-ui-icons/Settings';
import propSelector from '@pesposa/core/src/utils/propSelector';
import defaultTheme from 'config/theme';
import { connectData } from 'lib/connectData';
import { selectors as authSelectors } from 'store/firebase/auth';
import { models } from 'store/firebase/data';
import Imgix from 'components/Imgix/Imgix';
import UserFullName from 'components/UserFullName/UserFullName';
import ProfileImage from 'components/ProfileImage/ProfileImage';
import ListUserProviders from 'components/ListUserProviders/ListUserProviders';

const IMGIX_PARAMS = {
  w: 900,
  h: 300,
  auto: 'compress',
  blend: defaultTheme.palette.primary.light,
  balph: 100,
  bm: 'multiply',
  colorquant: 3,
  fit: 'crop',
  crop: 'faces,edges',
  blur: 30,
};

const styles = theme => ({
  root: {
    height: 300,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: [theme.borderRadius.xl, theme.borderRadius.xl, 0, 0],
    backgroundColor: theme.palette.secondary.light,
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

export const ProfileBanner = ({
  userId,
  avatarPath,
  isCurrentUser,
  classes,
}) => (
  <Imgix params={IMGIX_PARAMS} image={{ fullPath: avatarPath }}>
    {({ src }) => (
      <div
        className={classes.root}
        style={src && { backgroundImage: `url(${src})` }}
      >
        <div className={classes.content}>
          <ProfileImage userId={userId} size={94} />
          <UserFullName
            userId={userId}
            render={({ userFullName }) => (
              <Typography className={classes.fullname} variant="title">
                {userFullName}
              </Typography>
            )}
          />
          <Typography className={classes.verifiedTitle} variant="button">
            Verified Accounts
          </Typography>
          <ListUserProviders
            className={classes.providers}
            userId={userId}
            link={isCurrentUser}
          />
          <SettingsIcon className={classes.settingsIcon} />
        </div>
      </div>
    )}
  </Imgix>
);

const mapDataToProps = {
  avatarPath: models.users.one(propSelector('userId')).child('avatarPath'),
};

const mapStateToProps = createStructuredSelector({
  isCurrentUser: authSelectors.isCurrentUserSelector(propSelector('userId')),
});

export default R.compose(
  connectData(mapDataToProps, mapStateToProps),
  withStyles(styles),
)(ProfileBanner);
