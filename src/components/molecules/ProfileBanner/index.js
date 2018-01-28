import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { withProps } from 'recompose';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import SettingsIcon from 'material-ui-icons/Settings';
import { buildUrl } from 'services/imgix';
import propSelector from 'utils/propSelector';
import { selectors as authSelectors } from 'store/firebase/auth';
import withProfileData from 'components/hocs/withProfileData';
import UserFullName from 'components/atoms/UserFullName';
import ProfileImage from 'components/atoms/ProfileImage';
import ListUserProviders from 'components/molecules/ListUserProviders';
import LinkProviders from 'components/molecules/LinkProviders';

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
    borderRadius: theme.custom.borderRadius.sm,
    backgroundColor: '#20031C',
  },
  content: {
    position: 'relative',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 4 * theme.spacing.unit,
  },
  avatar: {
    width: 94,
    height: 94,
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
  src,
  providersComponent: Providers,
  classes,
}) => (
  <div className={classes.root} style={{ backgroundImage: `url(${src})` }}>
    <div className={classes.content}>
      <ProfileImage className={classes.avatar} userId={userId} size={128} />
      <UserFullName className={classes.fullname} userId={userId} type="title" />
      <Typography className={classes.verifiedTitle} type="button">
        Verified Accounts
      </Typography>
      <Providers className={classes.providers} userId={userId} />
      <SettingsIcon className={classes.settingsIcon} />
    </div>
  </div>
);

const srcSelector = createSelector(
  propSelector('profileImagePath'),
  path => (path ? buildUrl(path, IMGIX_PARAMS) : null),
);

const mapStateToProps = createStructuredSelector({
  isCurrentUser: authSelectors.isCurrentUserSelector(propSelector('userId')),
  src: srcSelector,
});

export default R.compose(
  withProfileData(
    {
      profileImagePath: ['image', 'fullPath'],
    },
    propSelector('userId'),
  ),
  connect(mapStateToProps),
  withProps(({ isCurrentUser }) => ({
    providersComponent: isCurrentUser ? LinkProviders : ListUserProviders,
  })),
  withStyles(styles),
)(ProfileBanner);
