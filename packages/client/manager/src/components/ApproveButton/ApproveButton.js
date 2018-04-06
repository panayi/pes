import React from 'react';
import classNames from 'classnames';
import { green } from '@material-ui/core/colors';
import withStyles from '@material-ui/core/styles/withStyles';
import DoneIcon from '@material-ui/icons/Done';
import Button from '@pesposa/client-core/src/components/Button/Button';

const styles = theme => ({
  root: {
    color: theme.palette.common.white,
    backgroundColor: green[400],
  },
  icon: {
    paddingRight: theme.spacing.unit / 2,
  },
});

const ApproveButton = ({ className, classes, children, ...rest }) => (
  <Button
    variant="raised"
    className={classNames(classes.root, className)}
    {...rest}
  >
    <DoneIcon className={classes.icon} />
    {children}
  </Button>
);

export default withStyles(styles)(ApproveButton);
