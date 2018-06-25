import React from 'react';
import * as R from 'ramda';
import { withRouter } from 'react-router-dom';
import { DesktopScreen } from 'react-responsive-redux';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import Link from '@pesposa/client-core/src/components/Link/Link';
import UserImage from '@pesposa/client-core/src/modules/User/UserImage/UserImage';
import AdTitle from '@pesposa/client-core/src/modules/Ad/AdTitle/AdTitle';
import UserName from '@pesposa/client-core/src/modules/User/UserName/UserName';
import AdBody from '@pesposa/client-core/src/modules/Ad/AdBody/AdBody';
import LinkToSeller from '@pesposa/client-core/src/modules/Ad/LinkToSeller/LinkToSeller';
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
    maxWidth: 160,
    padding: [0, theme.spacing.unit],
  },
  title: {
    webkitLineClamp: 1,
    maxHeight: 24,
    maxWidth: '100%',
    overflow: 'hidden',
    textOveflow: 'ellipsis',
  },
  body: {
    webkitLineClamp: 1,
    maxHeight: 15,
    maxWidth: '100%',
    overflow: 'hidden',
    textOveflow: 'ellipsis',
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
  otherUserType,
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
    <LinkToSeller sellerId={otherUserId} sellerType={otherUserType}>
      {({ navigate }) => (
        <div
          className={classes.user}
          role="button"
          tabIndex="-1"
          onClick={navigate}
        >
          <UserImage userId={otherUserId} userType={otherUserType} />
          <DesktopScreen>
            <UserName
              userId={otherUserId}
              userType={otherUserType}
              render={({ name }) => (
                <Typography className={classes.userName} variant="body2">
                  {name}
                </Typography>
              )}
            />
          </DesktopScreen>
        </div>
      )}
    </LinkToSeller>
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
          lines={1}
        />
        <AdBody className={classes.body} ad={ad} variant="caption" lines={1} />
      </div>
      <AdThumbnail ad={ad} />
    </div>
  </div>
);

export default R.compose(
  withRouter,
  withStyles(styles),
)(ConversationHeader);
