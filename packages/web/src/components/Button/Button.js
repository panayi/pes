import React from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MaterialButton from 'material-ui/Button';
import withStyles from 'material-ui/styles/withStyles';

const styles = theme => ({
  outline: {
    border: [2, 'solid', theme.palette.text.primary],
  },
  root: {
    minHeight: 39,
    fontWeight: theme.typography.fontWeightBold,
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

const Button = ({ classes, variant, className, children, ...rest }) => (
  <MaterialButton
    classes={R.omit(['outline'], classes)}
    className={classNames(classes[variant], className)}
    variant={variant === 'outline' ? null : variant}
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
