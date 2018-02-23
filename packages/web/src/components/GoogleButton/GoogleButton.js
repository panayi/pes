import React from 'react';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import GoogleIcon from '../GoogleIcon/GoogleIcon';

const styles = theme => ({
  root: {
    background: '#FFF',
    '&:hover': {
      background: '#FFF',
    },
  },
  text: {
    paddingLeft: theme.spacing.unit,
  },
});

const GoogleButton = ({ children, classes, ...rest }) => (
  <Button {...rest} variant="raised" classes={{ root: classes.root }}>
    <GoogleIcon />
    <span className={classes.text}>{children}</span>
  </Button>
);

export default withStyles(styles)(GoogleButton);
