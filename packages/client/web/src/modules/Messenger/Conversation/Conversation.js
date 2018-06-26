import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { withProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import withStyles from '@material-ui/core/styles/withStyles';
import propSelector from '@pesposa/core/src/utils/propSelector';
import propOrSelector from '@pesposa/core/src/utils/propOrSelector';
import { connectData } from '@pesposa/client-core/src/lib/connectData';
import { models } from '@pesposa/client-core/src/store/firebase/data';
import hydrateAd from '@pesposa/client-core/src/modules/Ad/hydrateAd';
import { actions as chatActions } from 'store/chat';
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
    this.activateConversation(this.props);
  }

  componentDidUpdate(prevProps) {
    const { messages } = this.props;
    this.activateConversation(this.props);

    if (messages.length > prevProps.messages.length) {
      this.scrollToBottom();
    }
  }

  componentWillUnmount() {
    const { deactivateConversation } = this.props;
    deactivateConversation();
  }

  activateConversation(props) {
    const { activateConversation } = this.props;
    activateConversation(R.path(['conversation', 'id'], props));
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
      otherUserType,
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
            otherUserType={otherUserType}
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
    sellerIdSelector: propSelector(['ad', 'seller']),
  }),
  otherUserType: utils.createOtherUserTypeSelector({
    buyerIdSelector,
    adSelector: propSelector('ad'),
  }),
});

const mapDispatchToProps = {
  activateConversation: chatActions.activateConversation,
  deactivateConversation: chatActions.deactivateConversation,
};

export default R.compose(
  hydrateAd(adIdSelector),
  connectData(mapDataToProps, mapStateToProps, mapDispatchToProps),
  withProps(
    createStructuredSelector({
      messages: propOrSelector([], 'messages'),
    }),
  ),
  withStyles(styles),
)(Conversation);
