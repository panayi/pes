/* @flow */
import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import TimeAgo from 'react-timeago';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { blue } from 'material-ui/colors';
import propSelector from '@pesposa/core/src/utils/propSelector';
import hydrateAd from 'hocs/hydrateAd';
import Link from 'components/Link/Link';
import LineClamp from 'components/LineClamp/LineClamp';
import UserFullName from 'components/UserFullName/UserFullName';
import AdTitle from 'components/AdTitle/AdTitle';
import ProfileImage from 'components/ProfileImage/ProfileImage';
import * as utils from '../../utils';
import AdThumbnail from '../../AdThumbnail/AdThumbnail';
import UnreadConversationsBadge from '../../UnreadConversationsBadge/UnreadConversationsBadge';

type Props = {
  conversation: Object,
  ad: Ad,
  otherUserId: string,
  classes: Object,
};

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 85,
    padding: [theme.spacing.unit * 2, theme.spacing.unit],
    borderBottom: [1, 'solid', theme.palette.divider],
  },
  active: {
    background: '#f5f0f0',
  },
  adThumbnail: {
    flex: 0,
    flexBasis: 50,
    width: 50,
  },
  unreadBadge: {
    top: 'auto',
    bottom: -17,
    left: 0,
    right: 0,
    margin: [0, 'auto'],
    width: 12,
    height: 12,
    background: blue.A200,
  },
  info: {
    flex: 1,
  },
  profileImage: {
    display: 'flex',
    flex: 0,
    flexBasis: 50,
    justifyContent: 'flex-end',
  },
});

const ConversationItem = ({
  conversation,
  ad,
  otherUserId,
  classes,
}: Props) => (
  <Link
    className={classes.root}
    activeClassName={classes.active}
    to={`/messages/${conversation.id}`}
  >
    <div className={classes.adThumbnail}>
      <UnreadConversationsBadge
        withNumber={false}
        classes={{ badge: classes.unreadBadge }}
      >
        <AdThumbnail ad={ad} />
      </UnreadConversationsBadge>
    </div>
    <div className={classes.info}>
      <UserFullName userId={otherUserId} />
      <AdTitle
        ad={ad}
        variant="caption"
        component={LineClamp}
        lines={1}
        height={16}
      />
      <Typography variant="caption">
        <TimeAgo date={conversation.lastMessageCreatedAt} minPeriod={30} />
      </Typography>
    </div>
    <div className={classes.profileImage}>
      {otherUserId && <ProfileImage userId={otherUserId} />}
    </div>
  </Link>
);

const mapStateToProps = createStructuredSelector({
  otherUserId: utils.createOtherUserIdSelector({
    buyerIdSelector: propSelector(['conversation', 'buyer']),
    sellerIdSelector: propSelector(['ad', 'user']),
  }),
});

export default R.compose(
  hydrateAd(propSelector(['conversation', 'ad'])),
  connect(mapStateToProps),
  withStyles(styles),
)(ConversationItem);