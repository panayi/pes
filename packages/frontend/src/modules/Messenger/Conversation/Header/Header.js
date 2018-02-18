import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { push as _push } from 'react-router-redux';
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
    cursor: 'pointer',
  },
  user: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
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

const ConversationHeader = ({ ad, otherUserId, push, classes }) => (
  <div className={classes.root}>
    <div
      className={classes.user}
      role="button"
      tabIndex="-1"
      onClick={() => push(`/user/${otherUserId}`)}
    >
      <ProfileImage userId={otherUserId} />
      <UserFullName
        className={classes.userName}
        userId={otherUserId}
        variant="body2"
      />
    </div>
    <div
      className={classes.ad}
      role="button"
      tabIndex="-1"
      onClick={() => push(`/i/${ad.id}`)}
    >
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

const mapDispatchToProps = {
  push: _push,
};

export default R.compose(connect(null, mapDispatchToProps), withStyles(styles))(
  ConversationHeader,
);
