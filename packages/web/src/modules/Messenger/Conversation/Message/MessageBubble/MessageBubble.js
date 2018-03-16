import React from 'react';
import classNames from 'classnames';
import TimeAgo from 'react-timeago';
import Typography from 'material-ui/Typography';
import { fade } from 'material-ui/styles/colorManipulator';
import { withStyles } from 'material-ui/styles';

const common = {
  position: 'relative',
  padding: [10, 20],
  margin: '0.25em',
  borderRadius: '0.6em',
};

const styles = theme => ({
  fromOther: {
    ...common,
    background: theme.palette.grey[200],
    '& $date': {
      opacity: 0.3,
    },
  },
  fromMe: {
    ...common,
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
    '& $date': {
      opacity: 0.7,
    },
  },
  date: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    paddingTop: theme.spacing.unit / 2,
  },
  conversation: {
    '&:before': {
      content: '""',
      display: 'block',
      width: '0.75em',
      height: '0.5em',
      position: 'absolute',
      bottom: 0,
    },
    '&$fromOther': {
      '&:before': {
        left: '-0.25em',
        borderRight: ['0.5em', 'solid', theme.palette.grey[200]],
        borderBottomRightRadius: '100%',
      },
    },
    '&$fromMe': {
      '&:before': {
        right: '-0.25em',
        borderLeft: ['0.5em', 'solid', theme.palette.primary.main],
        borderBottomLeftRadius: '100%',
      },
    },
  },
  ad: {
    '&$fromMe': {
      background: fade(theme.palette.primary.light, 0.8),
    },
  },
});

const MessageBubble = ({ fromOther, variant, message, classes, ...rest }) => (
  <div
    {...rest}
    className={classNames(classes[variant], {
      [classes.fromOther]: fromOther,
      [classes.fromMe]: !fromOther,
    })}
  >
    <Typography color="inherit">{message.body}</Typography>
    <div className={classes.date}>
      <Typography color="inherit" variant="caption">
        <TimeAgo date={message.createdAt} minPeriod={30} />
      </Typography>
    </div>
  </div>
);

export default withStyles(styles)(MessageBubble);
