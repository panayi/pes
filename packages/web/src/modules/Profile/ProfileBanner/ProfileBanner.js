import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { darken } from 'material-ui/styles/colorManipulator';
import SettingsIcon from 'material-ui-icons/Settings';
import propSelector from '@pesposa/core/src/utils/propSelector';
import { selectors as authSelectors } from 'store/firebase/auth';
import withProfileData from 'hocs/withProfileData';
import Imgix from 'components/Imgix/Imgix';
import UserFullName from 'components/UserFullName/UserFullName';
import ProfileImage from 'components/ProfileImage/ProfileImage';
import ListUserProviders from 'components/ListUserProviders/ListUserProviders';

const IMGIX_PARAMS = {
  w: 900,
  h: 300,
  auto: 'compress',
  blend: '9A30AE',
  balph: 100,
  bm: 'multiply',
  colorquant: 3,
  faceindex: 1,
  facepad: 2.5,
  fit: 'facearea',
  blur: 30,
};

const styles = theme => ({
  root: {
    height: 300,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: [theme.borderRadius.xl, theme.borderRadius.xl, 0, 0],
    backgroundColor: darken(theme.palette.primary[400], 0.5),
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
  profileImage,
  isCurrentUser,
  classes,
}) => (
  <Imgix params={IMGIX_PARAMS} image={profileImage}>
    {({ src }) => (
      <div
        className={classes.root}
        style={src && { backgroundImage: `url(${src})` }}
      >
        <div className={classes.content}>
          <ProfileImage userId={userId} size={94} />
          <UserFullName
            className={classes.fullname}
            userId={userId}
            variant="title"
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

const mapStateToProps = createStructuredSelector({
  isCurrentUser: authSelectors.isCurrentUserSelector(propSelector('userId')),
});

export default R.compose(
  withProfileData(
    {
      profileImage: ['image'],
    },
    propSelector('userId'),
  ),
  connect(mapStateToProps),
  withStyles(styles),
)(ProfileBanner);
