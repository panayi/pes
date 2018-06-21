import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import TimeAgo from 'react-timeago';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import { blue } from '@material-ui/core/colors';
import propSelector from '@pesposa/core/src/utils/propSelector';
import Link from '@pesposa/client-core/src/components/Link/Link';
import hydrateAd from '@pesposa/client-core/src/modules/Ad/hydrateAd';
import UserImage from '@pesposa/client-core/src/modules/User/UserImage/UserImage';
import UserName from '@pesposa/client-core/src/modules/User/UserName/UserName';
import AdTitle from '@pesposa/client-core/src/modules/Ad/AdTitle/AdTitle';
import * as utils from '../../utils';
import AdThumbnail from '../../AdThumbnail/AdThumbnail';
import UnreadConversationsBadge from '../../UnreadConversationsBadge/UnreadConversationsBadge';

// type Props = {
//   conversation: Object,
//   ad: Ad,
//   otherUserId: string,
//   classes: Object,
// };

const styles = theme => ({
  root: {
    height: 85,
    padding: [theme.spacing.unit * 2, theme.spacing.unit * 1.5],
    borderBottom: [1, 'solid', theme.palette.divider],
    borderRadius: 0,
  },
  active: {
    background: '#f5f0f0',
  },
  adThumbnail: {
    marginRight: theme.spacing.unit,
  },
  unreadBadge: {
    top: 'auto',
    bottom: -15,
    left: 0,
    right: 0,
    margin: [0, 'auto'],
    width: 12,
    height: 12,
    background: blue.A200,
  },
  info: {
    overflow: 'hidden',
  },
  title: {
    fontWeight: theme.typography.fontWeightMedium,
    WebkitLineClamp: 1,
    maxHeight: 16,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    [theme.breakpoints.down(theme.map.tablet)]: {
      maxWidth: 200, // TODO: find a proper fix instead of hard-coding width
    },
  },
  profileImage: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

const ConversationItem = ({
  conversation,
  ad,
  otherUserId,
  otherUserType,
  classes,
}) => (
  <Grid
    container
    component={Link}
    className={classes.root}
    activeClassName={classes.active}
    to={`/messages/${conversation.id}`}
  >
    <Grid item xs={2} className={classes.adThumbnail}>
      <UnreadConversationsBadge
        context={conversation}
        withNumber={false}
        classes={{ badge: classes.unreadBadge }}
      >
        <AdThumbnail ad={ad} size={48} />
      </UnreadConversationsBadge>
    </Grid>
    <Grid item xs={8} className={classes.info}>
      <UserName
        userId={otherUserId}
        userType={otherUserType}
        render={({ name }) => <Typography>{name}</Typography>}
      />
      <AdTitle className={classes.title} ad={ad} variant="caption" lines={1} />
      <Typography variant="caption">
        <TimeAgo date={conversation.lastMessageReceivedAt} minPeriod={30} />
      </Typography>
    </Grid>
    <Grid item xs={2} className={classes.profileImage}>
      {otherUserId && (
        <UserImage userId={otherUserId} userType={otherUserType} />
      )}
    </Grid>
  </Grid>
);

const buyerIdSelector = propSelector(['conversation', 'buyer']);

const mapStateToProps = createStructuredSelector({
  otherUserId: utils.createOtherUserIdSelector({
    buyerIdSelector,
    sellerIdSelector: propSelector(['ad', 'seller']),
  }),
  otherUserType: utils.createOtherUserTypeSelector(
    buyerIdSelector,
    propSelector('ad'),
  ),
});

export default R.compose(
  hydrateAd(propSelector(['conversation', 'ad'])),
  connect(mapStateToProps),
  withStyles(styles),
)(ConversationItem);
