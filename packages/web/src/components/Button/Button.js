import React from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MaterialButton from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  outline: {
    border: [2, 'solid', theme.palette.text.primary],
  },
  root: {
    minHeight: 39,
    borderRadius: theme.borderRadius.md,
    boxShadow: 'none',
    textTransform: 'none',
  },
  flatPrimary: {
    borderColor: theme.palette.primary.main,
  },
  flatSecondary: {
    borderColor: theme.palette.secondary.main,
  },
  raised: {
    fontWeight: 700,
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

const Button = ({ classes, variant, className, children, ...rest }) => (
  <MaterialButton
    classes={R.omit(['outline'], classes)}
    className={classNames(classes[variant], className)}
    variant={variant}
    {...rest}
  >
    {children}
  </MaterialButton>
);

Button.propTypes = {
  variant: PropTypes.oneOf(['flat', 'raised', 'fab', 'outline']),
};

Button.defaultProps = {
  variant: 'flat',
};

export default withStyles(styles)(Button);
