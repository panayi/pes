import React from 'react';
import * as R from 'ramda';
import { withStyles } from 'material-ui/styles';
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ad: {
    display: 'flex',
    alignItems: 'center',
  },
  user: {
    display: 'flex',
    alignItems: 'center',
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
});

const ConversationHeader = ({ ad, otherUserId, classes }) => (
    <div className={classes.root}>
      <div className={classes.user}>
        <ProfileImage userId={otherUserId} />
        <UserFullName
          className={classes.userName}
          userId={otherUserId}
          variant="body2"
        />
      </div>
      <div className={classes.ad}>
        <div className={classes.details}>
          <AdTitle
            className={classes.title}
            ad={ad}
            variant="subheading"
            component={LineClamp}
            lines={1}
          />
          <AdBody ad={ad} component={LineClamp} variant="caption" lines={1} />
        </div>
        <AdThumbnail ad={ad} />
      </div>
    </div>
  );

export default R.compose(withStyles(styles))(ConversationHeader);
