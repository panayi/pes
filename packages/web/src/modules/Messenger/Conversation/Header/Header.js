import React from 'react';
import * as R from 'ramda';
import { withRouter } from 'react-router-dom';
import { DesktopScreen } from 'react-responsive-redux';
import Typography from 'material-ui/Typography';
import withStyles from 'material-ui/styles/withStyles';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import Link from 'components/Link/Link';
import LineClamp from 'components/LineClamp/LineClamp';
import ProfileImage from 'components/ProfileImage/ProfileImage';
import AdTitle from 'components/AdTitle/AdTitle';
import AdBody from 'components/AdBody/AdBody';
import UserFullName from 'components/UserFullName/UserFullName';
import AdThumbnail from '../../AdThumbnail/AdThumbnail';

const styles = theme => ({
  root: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
  },
  ad: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  user: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  flex: {
    flex: 1,
  },
  userName: {
    marginLeft: theme.spacing.unit,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    textAlign: 'right',
    maxWidth: 250,
    paddingRight: theme.spacing.unit,
  },
  backButton: {
    width: 40,
    height: 40,
    marginRight: theme.spacing.unit,
    background: theme.palette.action.selected,
  },
});

const ConversationHeader = ({
  ad,
  otherUserId,
  withBackButton,
  history,
  classes,
}) => (
  <div className={classes.root}>
    {withBackButton && (
      <Link.icon to="/messages" className={classes.backButton}>
        <KeyboardArrowLeft />
      </Link.icon>
    )}
    <div
      className={classes.user}
      role="button"
      tabIndex="-1"
      onClick={() => history.push(`/user/${otherUserId}`)}
    >
      <ProfileImage userId={otherUserId} />
      <DesktopScreen>
        <UserFullName
          userId={otherUserId}
          render={({ userFullName }) => (
            <Typography className={classes.userName} variant="body2">
              {userFullName}
            </Typography>
          )}
        />
      </DesktopScreen>
    </div>
    <div className={classes.flex} />
    <div
      className={classes.ad}
      role="button"
      tabIndex="-1"
      onClick={() => history.push(`/i/${ad.id}`)}
    >
      <div className={classes.details}>
        <AdTitle
          className={classes.title}
          ad={ad}
          variant="subheading"
          component={LineClamp}
          lines={1}
          height={24}
        />
        <AdBody
          ad={ad}
          component={LineClamp}
          variant="caption"
          lines={1}
          height={16}
        />
      </div>
      <AdThumbnail ad={ad} />
    </div>
  </div>
);

export default R.compose(withRouter, withStyles(styles))(ConversationHeader);
