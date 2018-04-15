/* @flow */
import React from 'react';
import * as R from 'ramda';
import { DesktopScreen } from 'react-responsive-redux';
import Typography from 'material-ui/Typography';
import withStyles from 'material-ui/styles/withStyles';
import ConversationItem from './Item/Item';

type Props = {
  conversations: Array<Object>,
  classes: Object,
};

const styles = theme => ({
  root: {
    height: '100%',
    background: theme.palette.common.white,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
});

const ConversationsList = ({ conversations, classes }: Props) => (
  <div className={classes.root}>
    <DesktopScreen component={React.Fragment}>
      <div className={classes.header}>
        <Typography variant="subheading">Conversations</Typography>
      </div>
    </DesktopScreen>
    {R.map(
      conversation => (
        <ConversationItem key={conversation.id} conversation={conversation} />
      ),
      conversations,
    )}
  </div>
);

export default R.compose(withStyles(styles))(ConversationsList);
