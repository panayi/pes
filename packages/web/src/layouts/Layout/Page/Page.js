/* @flow weak */
import React from 'react';
import classNames from 'classnames';
import Paper from 'material-ui/Paper';
import withStyles from 'material-ui/styles/withStyles';

type Props = {
  children: React$Node,
  classes: Object,
  className: ?String,
  fixed: ?boolean,
  flex: ?boolean,
  wide: ?boolean,
};

const styles = {
  page: {
    flex: '1 1 100%',
    minHeight: '100%',
    backgroundColor: 'transparent',
  },
  fixed: {
    flex: '1 1 100%',
    maxWidth: 900,
    height: '100%',
    margin: '0 auto',
  },
  flex: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  wide: {
    maxWidth: 1200,
  },
};

const Page = ({
  children,
  classes,
  className,
  fixed,
  flex,
  wide,
  ...otherProps
}: Props) => {
  const childrenWithFlex = flex ? (
    <div className={classes.flex}>{children}</div>
  ) : (
    children
  );
  const childrenWithFixed = fixed ? (
    <div className={classNames(classes.fixed, { [classes.wide]: wide })}>
      {childrenWithFlex}
    </div>
  ) : (
    childrenWithFlex
  );

  return (
    <Paper
      className={classNames(classes.page, className)}
      elevation={0}
      square
      {...otherProps}
    >
      {childrenWithFixed}
    </Paper>
  );
};

export default withStyles(styles)(Page);
