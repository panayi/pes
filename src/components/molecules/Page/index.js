/* @flow weak */
import React from 'react';
import classNames from 'classnames';
import { Paper } from 'material-ui';
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
    backgroundColor: theme.palette.background.contentFrame,
  },
  fixed: {
    flex: '1 1 100%',
    maxWidth: 900,
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
