import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import classNames from 'classnames';
import { withProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import createCachedSelector from 're-reselect';
import TimeAgo from 'react-timeago';
import { withStyles } from 'material-ui/styles';
import propSelector from '@pesposa/core/src/utils/propSelector';
import Tooltip from 'components/Tooltip/Tooltip';
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
      <MessageBubble
        fromOther={isFromOtherUser}
        data-tip="tip"
        data-for={message.id}
      >
        {message.body}
      </MessageBubble>
      <Tooltip id={message.id}>
        <TimeAgo date={message.createdAt} />
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
