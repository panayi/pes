/* @flow */
import React from 'react';
import * as R from 'ramda';
import TimeAgo from 'react-timeago';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { propSelector } from 'pesposa-utils';
import Link from 'components/Link/Link';
import LineClamp from 'components/LineClamp/LineClamp';
import UserFullName from 'components/UserFullName/UserFullName';
import AdTitle from 'components/AdTitle/AdTitle';
import ProfileImage from 'components/ProfileImage/ProfileImage';
import withConversationData from '../../withConversationData/withConversationData';
import AdThumbnail from '../../AdThumbnail/AdThumbnail';

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
    padding: theme.spacing.unit,
    borderBottom: [1, 'solid', theme.palette.divider],
  },
  active: {
    background: '#f5f0f0',
  },
  info: {
    padding: [0, theme.spacing.unit],
  },
  profileImageWrap: {
    display: 'flex',
    flex: 1,
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
    to={`/messages/${conversation.ad}/${conversation.buyer}`}
  >
    <AdThumbnail ad={ad} />
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
    <div className={classes.profileImageWrap}>
      {otherUserId && <ProfileImage userId={otherUserId} />}
    </div>
  </Link>
);

export default R.compose(
  withConversationData({
    adSelector: propSelector(['conversation', 'ad']),
    buyerSelector: propSelector(['conversation', 'buyer']),
  }),
  withStyles(styles),
)(ConversationItem);
