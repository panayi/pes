import React from 'react';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import FacebookBoxIcon from 'mdi-react/FacebookBoxIcon';
import { colors as colorConstants } from 'pesposa-core/constants';

const styles = theme => ({
  root: {
    color: theme.palette.common.white,
    background: colorConstants.FACEBOOK,
    '&:hover': {
      background: colorConstants.FACEBOOK,
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
