import React from 'react';
import classNames from 'classnames';
import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '../Button/Button';

const styles = theme => ({
  root: {
    position: 'relative',
  },
  buttonProgress: {
    color: theme.palette.common.white,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

const LoadingButton = ({
  progressProps,
  className,
  children,
  classes,
  ...rest
}) => (
  <React.Fragment>
    <Button {...rest} className={classNames(classes.root, className)} disabled>
      <CircularProgress
        {...progressProps}
        size={24}
        className={classes.buttonProgress}
      />
      {children}
    </Button>
  </React.Fragment>
);

export default withStyles(styles)(LoadingButton);
