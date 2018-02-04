/* @flow */
import React from 'react';
import { Configure } from 'react-instantsearch/dom';
import { withStyles } from 'material-ui/styles';
import Header from 'components/organisms/Header';
import SearchAds from 'components/organisms/SearchAds';

type Props = {
  children: React$Node,
  classes: Object,
  configureSearch: React$Element<Configure> | null,
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
  },
});

const Layout = ({ configureSearch, children, classes }: Props) => (
  <div className={classes.root}>
    <Header />
    {children}
    {configureSearch || <SearchAds.ConfigureSearchParams />}
  </div>
);

export default withStyles(styles)(Layout);
