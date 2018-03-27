import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import classNames from 'classnames';
import { withProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import createCachedSelector from 're-reselect';
import withStyles from 'material-ui/styles/withStyles';
import propSelector from '@pesposa/core/src/utils/propSelector';
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

const Message = ({ message, isFromOtherUser, variant, classes }) => (
  <div
    className={classNames(classes.root, {
      [classes.fromOther]: isFromOtherUser,
    })}
  >
    <div className={classes.bubbleWrap}>
      <MessageBubble
        fromOther={isFromOtherUser}
        variant={variant}
        message={message}
      />
    </div>
  </div>
);

Message.propTypes = {
  message: PropTypes.shape({}).isRequired,
  isBuyer: PropTypes.bool.isRequired, // eslint-disable-line react/no-unused-prop-types
  variant: PropTypes.oneOf(['conversation', 'ad']),
};

Message.defaultProps = {
  variant: 'conversation',
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
