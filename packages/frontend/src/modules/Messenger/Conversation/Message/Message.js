import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import classNames from 'classnames';
import { withProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import createCachedSelector from 're-reselect';
import TimeAgo from 'react-timeago';
import Tooltip from 'material-ui/Tooltip';
import { withStyles } from 'material-ui/styles';
import { propSelector } from 'pesposa-utils';
import MessageBubble from './MessageBubble/MessageBubble';

const styles = theme => ({
  root: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: theme.spacing.unit * 2,
  },
  bubbleWrap: {
    wordBreak: 'break-word',
    maxWidth: '60%',
  },
  fromOther: {
    justifyContent: 'flex-start',
  },
});

const Message = ({ message, isFromOtherUser, classes }) => (
    <div
      className={classNames(classes.root, {
        [classes.fromOther]: isFromOtherUser,
      })}
    >
      <div className={classes.bubbleWrap}>
        <Tooltip
          id={message.id}
          title={<TimeAgo date={message.createdAt} />}
          placement={isFromOtherUser ? 'right' : 'left'}
        >
          <MessageBubble fromOther={isFromOtherUser}>
            {message.body}
          </MessageBubble>
        </Tooltip>
      </div>
    </div>
  );

Message.propTypes = {
  message: PropTypes.shape({}).isRequired,
  isBuyer: PropTypes.bool.isRequired, // eslint-disable-line react/no-unused-prop-types
};

const isFromOtherUserSelector = createCachedSelector(
  propSelector(['message', 'fromBuyer']),
  propSelector('isBuyer'),
  R.complement(R.equals),
)(propSelector(['message', 'id']));

export default R.compose(
  withProps(
    createStructuredSelector({
      isFromOtherUser: isFromOtherUserSelector,
    }),
  ),
  withStyles(styles),
)(Message);
