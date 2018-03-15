import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { withProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { withStyles } from 'material-ui/styles';
import propSelector from '@pesposa/core/src/utils/propSelector';
import { connectData } from 'lib/connectData';
import { models } from 'store/firebase/data';
import { actions as chatActions } from 'store/chat';
import hydrateAd from 'hocs/hydrateAd';
import * as utils from '../utils';
import SendMessage from '../SendMessage/SendMessage';
import ConversationHeader from './Header/Header';
import Message from './Message/Message';

const styles = theme => ({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    backgroundColor: theme.palette.common.white,
  },
  header: {
    display: 'flex',
    flex: '0 0 54px',
    alignItems: 'center',
    padding: [0, theme.spacing.unit * 1.5],
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  messages: {
    flex: '1 1 auto',
    padding: [theme.spacing.unit * 2, theme.spacing.unit * 2, 0],
    overflowY: 'auto',
  },
  sendMessage: {
    borderTop: `1px solid ${theme.palette.divider}`,
    '& input': {
      borderRadius: '0 !important',
    },
  },
});

class Conversation extends Component {
  static propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({})),
  };

  static defaultProps = {
    messages: [],
  };

  componentDidMount() {
    this.scrollToBottom();
    this.setActiveConversation(this.props.conversation);
    this.maybeMarkAsRead(this.props.conversation);
  }

  componentWillReceiveProps(nextProps) {
    const nextId = R.pathOr(null, ['conversation', 'id'], nextProps);
    const id = R.pathOr(null, ['conversation', 'id'], this.props);
    if (nextId !== id) {
      this.setActiveConversation(nextProps.conversation);
    }
    this.maybeMarkAsRead(nextProps.conversation);
  }

  componentDidUpdate(prevProps) {
    if (this.props.messages.length > prevProps.messages.length) {
      this.scrollToBottom();
    }
  }

  componentWillUnmount() {
    this.props.resetActiveConversation();
  }

  setActiveConversation(conversation) {
    if (conversation) {
      this.props.setActiveConversation(conversation.id);
    }
  }

  maybeMarkAsRead(conversation) {
    console.log('maybeMarkAsRead');
    if (conversation && !conversation.read) {
      console.log('YES!');
      this.props.markAsRead(conversation.id);
    }
  }

  scrollToBottom() {
    this.messagesRef.scrollTop = this.messagesRef.scrollHeight;
  }

  render() {
    const {
      adId,
      buyerId,
      ad,
      variant,
      sendMessageAction,
      withBackButton,
      inputPlaceholder,
      otherUserId,
      isBuyer,
      messages,
      classes,
    } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <ConversationHeader
            ad={ad}
            otherUserId={otherUserId}
            withBackButton={withBackButton}
          />
        </div>
        <div
          className={classes.messages}
          ref={ref => {
            this.messagesRef = ref;
          }}
        >
          {R.map(
            message => (
              <Message key={message.id} message={message} isBuyer={isBuyer} />
            ),
            messages,
          )}
        </div>
        <div className={classes.sendMessage}>
          <SendMessage
            variant={variant}
            action={sendMessageAction}
            placeholder={inputPlaceholder}
            adId={adId}
            buyerId={buyerId}
          />
        </div>
      </div>
    );
  }
}

const buyerIdSelector = R.either(
  propSelector('buyerId'),
  propSelector(['conversation', 'buyer']),
);
const adIdSelector = R.either(
  propSelector('adId'),
  propSelector(['conversation', 'ad']),
);

const mapDataToProps = {
  messages: models.messages({
    adSelector: adIdSelector,
    buyerSelector: buyerIdSelector,
  }).all,
};

const mapStateToProps = createStructuredSelector({
  adId: adIdSelector,
  buyerId: buyerIdSelector,
  isBuyer: utils.createIsBuyerSelector(buyerIdSelector),
  otherUserId: utils.createOtherUserIdSelector({
    buyerIdSelector,
    sellerIdSelector: propSelector(['ad', 'user']),
  }),
});

const mapDispatchToProps = {
  setActiveConversation: chatActions.setActiveConversation,
  resetActiveConversation: chatActions.resetActiveConversation,
  markAsRead: chatActions.markAsRead,
};

export default R.compose(
  hydrateAd(adIdSelector),
  connectData(mapDataToProps, mapStateToProps, mapDispatchToProps),
  withProps(
    createStructuredSelector({
      messages: R.compose(R.defaultTo([]), R.prop('messages')),
    }),
  ),
  withStyles(styles),
)(Conversation);
