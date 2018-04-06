import React from 'react';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  root: {
    display: 'block',
    textAlign: 'center',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  text: {
    position: 'relative',
    display: 'inline-block',

    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      width: '9999px',
      height: '1px',
      background: theme.palette.divider,
    },

    '&:before': {
      right: '100%',
      marginRight: '15px',
    },

    '&:after': {
      left: '100%',
      marginLeft: '15px',
    },
  },
});

const TextDivider = ({ children, classes, ...rest }) => (
  <div className={classes.root}>
    <Typography className={classes.text} {...rest}>
      {children}
    </Typography>
  </div>
);

export default withStyles(styles)(TextDivider);
