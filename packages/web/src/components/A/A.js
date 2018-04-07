import React from 'react';
import classNames from 'classnames';
import Typography from 'material-ui/Typography';
import withStyles from 'material-ui/styles/withStyles';
import { darken } from 'material-ui/styles/colorManipulator';

const styles = theme => ({
  root: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
    '&:active': {
      color: darken(theme.palette.primary.main, 0.2),
    },
  },
});

const A = ({ className, classes, ...rest }) => (
    <Typography
      className={classNames(classes.root, className)}
      {...rest}
      color="primary"
      component="a"
    />
  );

export default withStyles(styles)(A);
