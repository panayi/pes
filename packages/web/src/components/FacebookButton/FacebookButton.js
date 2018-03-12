import React from 'react';
import { withStyles } from 'material-ui/styles';
import FacebookBoxIcon from 'mdi-react/FacebookBoxIcon';
import * as colors from '@pesposa/core/src/config/colors';
import Button from 'components/Button/Button';

const styles = theme => ({
  root: {
    color: theme.palette.common.white,
    background: colors.FACEBOOK,
    '&:hover': {
      background: colors.FACEBOOK,
    },
  },
  text: {
    paddingLeft: theme.spacing.unit,
  },
});

const FacebookButton = ({ children, classes, ...rest }) => (
  <Button {...rest} classes={{ root: classes.root }}>
    <FacebookBoxIcon style={{ fill: 'white' }} />
    <span className={classes.text}>{children}</span>
  </Button>
);

export default withStyles(styles)(FacebookButton);
