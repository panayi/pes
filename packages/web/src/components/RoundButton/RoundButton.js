import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    height: 39, // equal to minHeight (see theme/default.js)
    borderRadius: theme.borderRadius.md,
    boxShadow: 'none',
    border: [2, 'solid', theme.palette.text.primary],
  },
  flatPrimary: {
    borderColor: theme.palette.primary.main,
  },
  flatSecondary: {
    borderColor: theme.palette.secondary.main,
  },
  raised: {
    border: 'none',
  },
  inverse: {
    borderColor: theme.palette.common.white,
    color: theme.palette.common.white,
  },
  disabled: {
    borderColor: theme.palette.action.disabledBackground,
  },
});

const RoundButton = ({
  classes,
  inverse,
  disabled,
  className,
  children,
  ...rest
}) => (
  <Button
    classes={classes}
    className={classNames(
      { [classes.inverse]: inverse, [classes.disabled]: disabled },
      className,
    )}
    disabled={disabled}
    {...rest}
  >
    {children}
  </Button>
);

RoundButton.propTypes = {
  variant: PropTypes.oneOf(['flat', 'outline']),
};

RoundButton.defaultProps = {
  variant: 'flat',
};

export default withStyles(styles)(RoundButton);
