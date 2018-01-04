import React from 'react';
import { Route } from 'react-router-dom';
import { Grid, withStyles } from 'material-ui';
import Page from 'components/molecules/Page';
import ConversationsList from 'components/molecules/ConversationsList';
import Layout from 'components/organisms/Layout';
import Conversation from 'components/organisms/Conversation';

const styles = theme => ({
  root: {
    height: '100%',
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.text.divider}`,
    borderRadius: theme.custom.borderRadius.md,
  },
  list: {
    borderRight: `1px solid ${theme.palette.text.divider}`,
  },
  conversationWrap: {
    display: 'flex',
  },
});

const Messages = ({ classes }) => (
  <Layout>
    <Page fixed>
      <Grid className={classes.root} container spacing={0}>
        <Grid className={classes.list} item xs={3}>
          <ConversationsList />
        </Grid>
        <Grid className={classes.conversationWrap} item xs={9}>
          <Route path="/messages/:ad/:buyer" component={Conversation} />
        </Grid>
      </Grid>
    </Page>
  </Layout>
);

export default withStyles(styles)(Messages);
