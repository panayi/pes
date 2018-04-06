import React from 'react';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

// type Props = {
//   children: React$Node,
//   classes: Object,
//   className: ?String,
//   fixed: ?boolean,
//   flex: ?boolean,
//   wide: ?boolean,
// };

const styles = theme => ({
  page: {
    backgroundColor: 'transparent',
    flex: 1,
    minHeight: `calc(100% - ${theme.layout.headerHeight.tablet}px)`,
    [theme.breakpoints.down(theme.map.phone)]: {
      minHeight: `calc(100% - ${theme.layout.headerHeight.phone}px)`,
    },
  },
  fixed: {
    flex: '1 1 auto',
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
});

const Page = ({
  children,
  classes,
  className,
  fixed,
  flex,
  wide,
  ...otherProps
}) => {
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
