import React from 'react';
import * as R from 'ramda';
import MaterialButton from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  root: {
    minHeight: 39,
    fontWeight: theme.typography.fontWeightBold,
    borderRadius: theme.borderRadius.md,
    boxShadow: 'none',
    textTransform: 'none',
    '&:active, &:focus, &:hover': {
      boxShadow: 'none',
    },
  },
  raisedPrimary: {
    // Fix Safari issue making buttons have text color = black
    // when inside a form
    WebkitTextFillColor: theme.palette.common.white,
  },
  raisedSecondary: {
    // Fix Safari issue making buttons have text color = black
    // when inside a form
    WebkitTextFillColor: theme.palette.common.white,
  },
  sizeSmall: {
    minHeight: 34,
  },
  sizeLarge: {
    minHeight: 43,
  },
  disabled: {
    borderColor: theme.palette.action.disabledBackground,
  },
});

const Button = ({ classes, className, children, ...rest }) => (
  <MaterialButton
    classes={R.omit(['outline'], classes)}
    className={className}
    {...rest}
  >
    {children}
  </MaterialButton>
);

export default withStyles(styles)(Button);
