/* @flow */
import React from 'react';
import { withStyles } from 'material-ui/styles';
import Header from 'components/organisms/Header';

type Props = {
  children: React$Node,
  classes: Object,
};

const styles = {
  '@global': {
    body: {
      marginTop: '64px',
    },
  },
  root: {
    display: 'flex',
    alignItems: 'stretch',
    minHeight: '100vh',
    width: '100%',
  },
};

const Layout = ({ children, classes }: Props) => (
  <div className={classes.root}>
    <Header />
    {children}
  </div>
);

export default withStyles(styles)(Layout);
