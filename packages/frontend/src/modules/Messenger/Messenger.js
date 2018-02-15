import React from 'react';
import { Route } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import ConversationsList from './ConversationsList/ConversationsList';
import Conversation from './Conversation/Conversation';

const styles = theme => ({
  root: {
    height: '100%',
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.borderRadius.md,
  },
  list: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  conversationWrap: {
    display: 'flex',
  },
});

const Messages = ({ classes }) => (
  <React.Fragment>
    <Grid className={classes.root} container spacing={0}>
      <Grid className={classes.list} item xs={3}>
        <ConversationsList />
      </Grid>
      <Grid className={classes.conversationWrap} item xs={9}>
        <Route path="/messages/:ad/:buyer" component={Conversation} />
      </Grid>
    </Grid>
  </React.Fragment>
);

export default withStyles(styles)(Messages);
