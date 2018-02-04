/* @flow weak */
import React from 'react';
import classNames from 'classnames';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';

type Props = {
  children: React$Node,
  classes: Object,
  className: ?String,
  fixed: ?boolean,
};

const styles = theme => ({
  page: {
    ...theme.mixins.gutters({}),
    paddingTop: theme.spacing.unit * 2.5,
    paddingBottom: theme.spacing.unit * 2.5,
    flex: '1 1 100%',
    minHeight: '100%',
    backgroundColor: theme.palette.grey[200],
  },
  fixed: {
    flex: '1 1 100%',
    maxWidth: 900,
    height: '100%',
    minHeight: '100%',
    margin: '0 auto',
  },
});

const Page = ({
  children,
  classes,
  className,
  fixed,
  ...otherProps
}: Props) => (
  <Paper
    className={classNames(classes.page, className)}
    elevation={0}
    {...otherProps}
  >
    {fixed ? <div className={classes.fixed}>{children}</div> : children}
  </Paper>
);

export default withStyles(styles)(Page);
