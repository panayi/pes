import React from 'react';
import { TextField, withStyles } from 'material-ui';

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

const Conversation = ({ classes }) => (
  <div className={classes.root}>
    <div className={classes.header}>header goes here</div>
    <div className={classes.messages}>messages go here</div>
    <div className={classes.sendMessage}>
      <TextField fullWidth placeholder="Enter your message" />
    </div>
  </div>
);

export default withStyles(styles)(Conversation);
