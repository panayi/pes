import React from 'react';
import * as R from 'ramda';
import { createSelector, createStructuredSelector } from 'reselect';
import { withProps, branch, renderNothing } from 'recompose';
import { withStyles } from 'material-ui/styles';
import ArrowForwardIcon from 'material-ui-icons/ArrowForward';
import * as modelPaths from '@pesposa/core/src/config/modelPaths';
import propSelector from '@pesposa/core/src/utils/propSelector';
import Link from 'components/Link/Link';
import Message from 'modules/Messenger/Conversation/Message/Message';

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit * 2,
    textAlign: 'right',
  },
  icon: {
    marginLeft: theme.spacing.unit,
    width: 18,
    height: 18,
  },
});

const SentMessages = ({ messages, conversationId, classes }) => (
  <div className={classes.root}>
    {R.map(
      message => (
        <Message key={message.id} variant="ad" message={message} isBuyer />
      ),
      messages,
    )}
    <Link
      to={`/messages/${conversationId}`}
      variant="raised"
      size="small"
      className={classes.link}
    >
      View conversation<ArrowForwardIcon className={classes.icon} />
    </Link>
  </div>
);

const messagesSelector = createSelector(
  propSelector('messages'),
  R.compose(
    R.addIndex(R.map)((body, index) => ({
      id: `${index}`,
      body,
      fromBuyer: true,
    })),
    R.defaultTo([]),
  ),
);

const conversationIdSelector = createSelector(
  propSelector('adId'),
  propSelector('uid'),
  modelPaths.getConversationId,
);

export default R.compose(
  withProps(
    createStructuredSelector({
      messages: messagesSelector,
      conversationId: conversationIdSelector,
    }),
  ),
  branch(R.propSatisfies(R.isEmpty, 'messages'), renderNothing),
  withStyles(styles),
)(SentMessages);
