import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { connect } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';
import { withProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { MobileScreen, DesktopScreen } from 'react-responsive-redux';
import Grid from 'material-ui/Grid';
import withStyles from 'material-ui/styles/withStyles';
import { models } from 'store/firebase/data';
import Spinner from 'components/Spinner/Spinner';
import Conversations from './Conversations/Conversations';
import Conversation from './Conversation/Conversation';
import NoConversations from './NoConversations/NoConversations';
import NoConversationSelected from './NoConversationSelected/NoConversationSelected';

const styles = theme => ({
  root: {
    position: 'relative',
    height: `calc(100% - ${theme.spacing.unit * 4})`,
    marginTop: theme.spacing.unit * 2,
    overflow: 'hidden',
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.borderRadius.md,
  },
  list: {
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.common.white,
  },
  conversationWrap: {
    display: 'flex',
    height: '100%',
  },
  fullHeight: {
    height: '100%',
  },
});

class Messenger extends Component {
  renderLoadingConversations() {
    return !isLoaded(this.props.conversations) ? <Spinner centered /> : null;
  }

  renderNoConversations() {
    const { conversations } = this.props;
    const noConversations =
      isNilOrEmpty(conversations) && isLoaded(conversations);
    return noConversations ? <NoConversations /> : null;
  }

  renderConversationsSplitView() {
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
          {selectedConversation ? (
            <Conversation
              conversation={selectedConversation}
              inputPlaceholder="Type your message..."
              variant="box"
              withBackButton
            />
          ) : (
            <NoConversationSelected />
          )}
        </Grid>
      </React.Fragment>
    );
  }

  renderConversations() {
    const { conversations } = this.props;

    if (isNilOrEmpty(conversations)) {
      return null;
    }

    return <Conversations conversations={conversations} />;
  }

  renderConversation() {
    const { selectedConversation } = this.props;

    if (isNilOrEmpty(selectedConversation)) {
      return null;
    }

    return (
      <Conversation
        conversation={selectedConversation}
        inputPlaceholder="Type your message..."
        variant="box"
        withBackButton
      />
    );
  }

  render() {
    const { conversationId, classes } = this.props;

    return (
      <React.Fragment>
        <DesktopScreen component={React.Fragment}>
          <Grid className={classes.root} container spacing={0}>
            {this.renderLoadingConversations()}
            {this.renderNoConversations()}
            {this.renderConversationsSplitView()}
          </Grid>
        </DesktopScreen>
        <MobileScreen className={classes.fullHeight}>
          {this.renderLoadingConversations()}
          {this.renderNoConversations()}
          {conversationId
            ? this.renderConversation()
            : this.renderConversations()}
        </MobileScreen>
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

const mapStateToProps = createStructuredSelector({
  conversations: models.conversations.all.selector,
});

export default R.compose(
  connect(mapStateToProps),
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
