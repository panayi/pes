/* @flow */
import React from 'react';
import * as R from 'ramda';
import { Typography, withStyles } from 'material-ui';
import { connectData } from 'lib/connectData';
import { models } from 'store/data';
import ConversationItem from './ConversationItem';

type Props = {
  conversations: Array<Object>,
  classes: Object,
};

const styles = theme => ({
  header: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    textAlign: 'center',
    borderBottom: `1px solid ${theme.palette.text.divider}`,
  },
});

const ConversationsList = ({ conversations, classes }: Props) => (
  <div>
    <div className={classes.header}>
      <Typography type="subheading">Conversations</Typography>
    </div>
    {R.map(
      conversation => (
        <ConversationItem key={conversation.id} conversation={conversation} />
      ),
      conversations,
    )}
  </div>
);

const mapDataToProps = {
  conversations: models.conversations.all,
};

export default R.compose(connectData(mapDataToProps), withStyles(styles))(
  ConversationsList,
);
