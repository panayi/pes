/* @flow */
import React from 'react';
import { Route } from 'react-router-dom';
import { withProps } from 'recompose';
import { withStyles } from 'material-ui/styles';
import Layout from 'layouts/Layout/Layout';
import Search from 'modules/Search/Search';
import Header from 'pages/components/Header/Header';
import Sidebar from './Sidebar/Sidebar';

const styles = theme => ({
  page: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  },
});

const HomeHeader = withProps({ inHome: true })(Header);

const Home = ({ classes }) => (
  <Layout
    header={HomeHeader}
    sidebar={Sidebar}
    pageClassName={classes.page}
    flex
  >
    <Route path="/:category?" component={Search} />
  </Layout>
);

export default withStyles(styles)(Home);
