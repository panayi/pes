/* @flow */
import React from 'react';
import { withStyles } from 'material-ui/styles';
import Header from 'components/organisms/Header';

type Props = {
  children: React$Node,
  classes: Object,
};

const styles = theme => ({
  '@global': {
    body: {
      marginTop: theme.layout.headerHeight,
    },
  },
  root: {
    display: 'flex',
    alignItems: 'stretch',
    // TODO: Use constant for header height
    minHeight: `calc(100vh - ${theme.layout.headerHeight}px)`,
    width: '100%',
    backgroundColor: theme.palette.grey[200],
  },
});

const Layout = ({ children, classes }: Props) => (
  <div className={classes.root}>
    <Header />
    {children}
  </div>
);

export default withStyles(styles)(Layout);
