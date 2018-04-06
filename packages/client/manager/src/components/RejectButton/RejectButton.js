import React from 'react';
import classNames from 'classnames';
import { red } from '@material-ui/core/colors';
import withStyles from '@material-ui/core/styles/withStyles';
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@pesposa/client-core/src/components/Button/Button';

const styles = theme => ({
  root: {
    color: theme.palette.common.white,
    backgroundColor: red[400],
  },
  icon: {
    paddingRight: theme.spacing.unit / 2,
  },
});

const RejectButton = ({ className, classes, children, ...rest }) => (
  <Button
    variant="raised"
    className={classNames(classes.root, className)}
    {...rest}
  >
    <CancelIcon className={classes.icon} />
    {children}
  </Button>
);

export default withStyles(styles)(RejectButton);
