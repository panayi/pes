import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import { connectData } from 'lib/connectData';
import { models } from 'store/firebase/data';
import ConversationsList from './ConversationsList/ConversationsList';
import Conversation from './Conversation/Conversation';
import NoConversations from './NoConversations/NoConversations';

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

const Messenger = ({ ad, buyer, conversations, classes }) => (
  <React.Fragment>
    <Grid className={classes.root} container spacing={0}>
      {R.isEmpty(conversations) ? (
        <NoConversations />
      ) : (
        <React.Fragment>
          <Grid className={classes.list} item xs={3}>
            <ConversationsList />
          </Grid>
          <Grid className={classes.conversationWrap} item xs={9}>
            {ad &&
              buyer && (
                <Conversation
                  ad={ad}
                  buyer={buyer}
                  conversations={conversations}
                />
              )}
          </Grid>
        </React.Fragment>
      )}
    </Grid>
  </React.Fragment>
);

Messenger.propTypes = {
  ad: PropTypes.shape({}),
  buyer: PropTypes.shape({}),
  conversations: PropTypes.arrayOf(PropTypes.shape({})),
};

Messenger.defaultProps = {
  ad: null,
  buyer: null,
  conversations: null,
};

const mapDataToProps = {
  conversations: models.conversations.all,
};

export default R.compose(connectData(mapDataToProps), withStyles(styles))(
  Messenger,
);
