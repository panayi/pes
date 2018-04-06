import React from 'react';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { darken } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  root: {
    display: 'inline',
    cursor: 'pointer',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
    '&:active': {
      color: darken(theme.palette.primary.main, 0.2),
    },
  },
});

const A = ({ component, className, classes, ...rest }) => (
  <Typography
    className={classNames(classes.root, className)}
    {...rest}
    color="primary"
    component={component}
  />
);

A.defaultProps = {
  component: 'a',
};

export default withStyles(styles)(A);
