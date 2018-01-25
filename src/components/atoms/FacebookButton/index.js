import React from 'react';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import FacebookBoxIcon from 'mdi-react/FacebookBoxIcon';

const FACEBOOK_COLOR = '#4769B0';

const styles = theme => ({
  root: {
    color: '#FFF',
    background: FACEBOOK_COLOR,
    '&:hover': {
      background: FACEBOOK_COLOR,
    },
  },
  text: {
    paddingLeft: theme.spacing.unit,
  },
});

const FacebookButton = ({ children, classes, ...rest }) => (
    <Button {...rest} classes={classes}>
      <FacebookBoxIcon style={{ fill: 'white' }} />
      <span className={classes.text}>{children}</span>
    </Button>
  );

export default withStyles(styles)(FacebookButton);
