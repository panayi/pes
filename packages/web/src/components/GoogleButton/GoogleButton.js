import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'components/Button/Button';
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
  <Button {...rest} variant="outline" classes={{ root: classes.root }}>
    <GoogleIcon />
    <span className={classes.text}>{children}</span>
  </Button>
);

export default withStyles(styles)(GoogleButton);
