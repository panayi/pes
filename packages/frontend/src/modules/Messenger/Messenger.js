import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import { connectData } from 'lib/connectData';
import { models } from 'store/firebase/data';
import Spinner from 'components/Spinner/Spinner';
import Conversations from './Conversations/Conversations';
import Conversation from './Conversation/Conversation';
import NoConversations from './NoConversations/NoConversations';

const styles = theme => ({
  root: {
    position: 'relative',
    // TODO: make dynamic
    height: 'calc(100vh - 88px)',
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

class Messenger extends Component {
  renderConversations() {
    const { ad, buyer, conversations, classes } = this.props;

    if (isNilOrEmpty(conversations)) {
      return null;
    }

    return (
      <React.Fragment>
        <Grid className={classes.list} item xs={3}>
          <Conversations conversations={conversations} />
        </Grid>
        <Grid className={classes.conversationWrap} item xs={9}>
          {ad &&
            buyer && (
              <Conversation
                adId={ad}
                buyerId={buyer}
                conversations={conversations}
              />
            )}
        </Grid>
      </React.Fragment>
    );
  }

  renderNoConversations() {
    const { conversations, isLoaded } = this.props;
    const noConversations =
      isNilOrEmpty(conversations) && isLoaded.conversations;
    return noConversations ? <NoConversations /> : null;
  }

  renderLoadingConversations() {
    return !this.props.isLoaded.conversations ? <Spinner centered /> : null;
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Grid className={classes.root} container spacing={0}>
          {this.renderLoadingConversations()}
          {this.renderNoConversations()}
          {this.renderConversations()}
        </Grid>
      </React.Fragment>
    );
  }
}

Messenger.propTypes = {
  ad: PropTypes.string,
  buyer: PropTypes.string,
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
