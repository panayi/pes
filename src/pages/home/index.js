/* @flow */
import React from 'react';
import * as R from 'ramda';
import { Route } from 'react-router-dom';
import { withProps } from 'recompose';
import { createSelector, createStructuredSelector } from 'reselect';
import { InstantSearch } from 'react-instantsearch/dom';
import { withStyles } from 'material-ui/styles';
import propsSelector from '../../lib/selectors/props';
import SideNav, { type LinkType } from '../../lib/components/SideNav';
import { modelConnections, connectData } from '../../firebase';
import Layout from '../../layout';
import Posts from './posts';

type Props = {
  categoryLinks: Array<LinkType>,
  classes: Object,
};

const SIDEBAR_WIDTH = 200;

const PostsWithProps = withProps({ sidebarWidth: SIDEBAR_WIDTH })(Posts);

const styles = {
  page: {
    flex: '1 1 100%',
  },
};

const Home = ({ categoryLinks, classes }: Props) => (
  <InstantSearch
    appId={process.env.REACT_APP_ALGOLIA_APP_ID}
    apiKey={process.env.REACT_APP_ALGOLIA_SEARCH_KEY}
    indexName={process.env.REACT_APP_ALGOLIA_INDEX_NAME}
  >
    <Layout>
      <SideNav
        links={categoryLinks}
        width={SIDEBAR_WIDTH}
      />
      <div className={classes.page}>
        <Route
          path="/:categoryName?"
          component={PostsWithProps}
        />
      </div>
    </Layout>
  </InstantSearch>
);

const categoryLinksSelector = createSelector(
  R.compose(
    R.propOr([], 'categories'),
    propsSelector,
  ),
  R.map(({ name }) => ({
    label: name,
    to: `/${name}`,
  })),
);

export default R.compose(
  connectData({ categories: modelConnections.categories.all }),
  withProps(createStructuredSelector({
    categoryLinks: categoryLinksSelector,
  })),
  withStyles(styles),
)(Home);
