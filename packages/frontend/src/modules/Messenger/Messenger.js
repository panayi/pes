import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { withProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Spinner from 'components/Spinner/Spinner';
import withConversations from './withConversations/withConversations';
import Conversations from './Conversations/Conversations';
import Conversation from './Conversation/Conversation';
import NoConversations from './NoConversations/NoConversations';

const styles = theme => ({
  root: {
    position: 'relative',
    // TODO: make dynamic
    height: 'calc(100vh - 88px)',
    overflow: 'hidden',
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
    const { selectedConversation, conversations, classes } = this.props;

    if (isNilOrEmpty(conversations)) {
      return null;
    }

    return (
      <React.Fragment>
        <Grid className={classes.list} item xs={3}>
          <Conversations conversations={conversations} />
        </Grid>
        <Grid className={classes.conversationWrap} item xs={9}>
          {selectedConversation && (
            <Conversation conversation={selectedConversation} />
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
  conversationId: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  selectedConversation: PropTypes.shape({}),
  conversations: PropTypes.arrayOf(PropTypes.shape({})),
};

Messenger.defaultProps = {
  conversationId: null,
  selectedConversation: null,
  conversations: null,
};

export default R.compose(
  withConversations,
  withProps(
    createStructuredSelector({
      selectedConversation: R.converge(R.find, [
        R.compose(R.propEq('id'), R.prop('conversationId')),
        R.compose(R.defaultTo([]), R.prop('conversations')),
      ]),
    }),
  ),
  withStyles(styles),
)(Messenger);
