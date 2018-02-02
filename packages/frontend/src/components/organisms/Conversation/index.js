import React from 'react';
import * as R from 'ramda';
import { withProps } from 'recompose';
import { withStyles } from 'material-ui/styles';
import { connectData } from 'lib/connectData';
import { models } from 'store/firebase/data';
import SendMessage from 'components/molecules/SendMessage';

const styles = theme => ({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    flex: '0 0 56px',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    borderBottom: `1px solid ${theme.palette.text.divider}`,
  },
  messages: {
    flex: '1 1 auto',
    overflowY: 'auto',
  },
  sendMessage: {
    borderTop: `1px solid ${theme.palette.text.divider}`,
  },
});

const Conversation = ({ ad, messages, classes }) => (
  <div className={classes.root}>
    <div className={classes.header}>header goes here</div>
    <div className={classes.messages}>
      {R.map(message => <div key={message.id}>{message.body}</div>, messages)}
    </div>
    <div className={classes.sendMessage}>
      <SendMessage adId={ad} />
    </div>
  </div>
);

const mapDataToProps = {
  messages: models.messages.all,
};

export default R.compose(
  withProps(({ match }) => ({
    ad: match.params.ad,
    buyer: match.params.buyer,
  })),
  connectData(mapDataToProps),
  withStyles(styles),
)(Conversation);
