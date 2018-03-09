import React from 'react';
import Typography from 'material-ui/Typography';
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
    '&:before': {
      content: '""',
      position: 'absolute',
      zIndex: 2,
      bottom: -2,
      left: -7,
      height: 19,
      borderLeft: [20, 'solid', theme.palette.grey[200]],
      borderBottomRightRadius: '16px 14px',
      transform: 'translate(0, -2px)',
    },
    '&:after': {
      content: '""',
      position: 'absolute',
      zIndex: 3,
      bottom: -2,
      left: 4,
      width: 26,
      height: 20,
      background: 'white',
      borderBottomRightRadius: 10,
      transform: 'translate(-30px, -2px)',
    },
  },
  fromMe: {
    ...common,
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:before': {
      content: '""',
      position: 'absolute',
      zIndex: 1,
      bottom: -2,
      right: -8,
      height: 19,
      borderRight: [20, 'solid', theme.palette.primary.main],
      borderBottomLeftRadius: '16px 14px',
      transform: 'translate(0, -2px)',
    },
    '&:after': {
      content: '""',
      position: 'absolute',
      zIndex: 1,
      bottom: -2,
      right: -42,
      width: 12,
      height: 20,
      background: 'white',
      borderBottomLeftRadius: 10,
      transform: 'translate(-30px, -2px)',
    },
  },
});

const MessageBubble = ({ fromOther, children, classes, ...rest }) => (
  <div {...rest} className={fromOther ? classes.fromOther : classes.fromMe}>
    <Typography color="inherit">{children}</Typography>
  </div>
);

export default withStyles(styles)(MessageBubble);
