import React from 'react';
import classNames from 'classnames';
import Typography from 'material-ui/Typography';
import { fade } from 'material-ui/styles/colorManipulator';
import { withStyles } from 'material-ui/styles';

const common = {
  position: 'relative',
  padding: [10, 20],
  borderRadius: 25,
};

const styles = theme => ({
  fromOther: {
    ...common,
    background: theme.palette.grey[200],
  },
  fromMe: {
    ...common,
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  conversation: {
    '&:before': {
      content: '""',
      position: 'absolute',
      transform: 'translate(0, -2px)',
      height: 19,
    },
    '&:after': {
      content: '""',
      position: 'absolute',
      transform: 'translate(-30px, -2px)',
      height: 20,
    },
    '&$fromOther': {
      '&:before': {
        zIndex: 2,
        bottom: -2,
        left: -7,
        borderLeft: [20, 'solid', theme.palette.grey[200]],
        borderBottomRightRadius: '16px 14px',
      },
      '&:after': {
        zIndex: 3,
        bottom: -2,
        left: 4,
        width: 26,
        background: 'white',
        borderBottomRightRadius: 10,
      },
    },
    '&$fromMe': {
      '&:before': {
        zIndex: 1,
        bottom: -2,
        right: -8,
        borderRight: [20, 'solid', theme.palette.primary.main],
        borderBottomLeftRadius: '16px 14px',
      },
      '&:after': {
        zIndex: 1,
        bottom: -2,
        right: -42,
        width: 12,
        background: 'white',
        borderBottomLeftRadius: 10,
      },
    },
  },
  ad: {
    '&$fromMe': {
      background: fade(theme.palette.primary.light, 0.8),
    },
  },
});

const MessageBubble = ({ fromOther, variant, children, classes, ...rest }) => (
  <div
    {...rest}
    className={classNames(classes[variant], {
      [classes.fromOther]: fromOther,
      [classes.fromMe]: !fromOther,
    })}
  >
    <Typography color="inherit">{children}</Typography>
  </div>
);

export default withStyles(styles)(MessageBubble);
