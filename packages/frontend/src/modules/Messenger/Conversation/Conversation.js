import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { withStyles } from 'material-ui/styles';
import { propSelector } from 'pesposa-utils';
import { connectData } from 'lib/connectData';
import { models } from 'store/firebase/data';
import SendMessage from 'components/SendMessage/SendMessage';
import withConversationData from '../withConversationData/withConversationData';
import ConversationHeader from './Header/Header';
import Message from './Message/Message';

const styles = theme => ({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    flex: '0 0 69px',
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
  }

  componentDidUpdate(prevProps) {
    if (this.props.messages.length > prevProps.messages.length) {
      this.scrollToBottom();
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
      otherUserId,
      isBuyer,
      messages,
      classes,
    } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <ConversationHeader ad={ad} otherUserId={otherUserId} />
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
            variant="chat"
            placeholder="Type your message..."
            adId={adId}
            buyerId={buyerId}
          />
        </div>
      </div>
    );
  }
}

const adSelector = propSelector('adId');
const buyerSelector = propSelector('buyerId');

const mapDataToProps = {
  messages: models.messages({
    adSelector,
    buyerSelector,
  }).all,
};

export default R.compose(
  connectData(mapDataToProps),
  withConversationData({
    adSelector,
    buyerSelector,
  }),
  withStyles(styles),
)(Conversation);
