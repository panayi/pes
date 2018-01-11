/* @flow */
import React from 'react';
import { withStyles } from 'material-ui/styles';
import Header from 'components/organisms/Header';
import SearchAds from 'components/organisms/SearchAds';

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
    // TODO: Use constant for header height
    minHeight: 'calc(100vh - 64px)',
    width: '100%',
  },
};

const Layout = ({ children, classes }: Props) => (
  <div className={classes.root}>
    <Header />
    {children}
    <SearchAds.ConfigureSearchParams />
  </div>
);

export default withStyles(styles)(Layout);
