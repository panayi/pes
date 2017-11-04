/* @flow */
import React from 'react';
import * as R from 'ramda';
import { Route } from 'react-router-dom';
import { withProps } from 'recompose';
import { createSelector, createStructuredSelector } from 'reselect';
import { InstantSearch } from 'react-instantsearch/dom';
import propsSelector from 'utils/propsSelector';
import Page from 'components/organisms/Page';
import { modelConnections, connectData } from 'services/firebase';
import Sidebar, { type LinkType } from 'components/organisms/Sidebar';
import Layout from 'components/organisms/Layout';
import Posts from './posts';

type Props = {
  categoryLinks: Array<LinkType>,
};

const Home = ({ categoryLinks }: Props) => (
  <InstantSearch
    appId={process.env.REACT_APP_ALGOLIA_APP_ID}
    apiKey={process.env.REACT_APP_ALGOLIA_SEARCH_KEY}
    indexName={process.env.REACT_APP_ALGOLIA_POSTS_INDEX_NAME}
  >
    <Layout>
      <Sidebar links={categoryLinks} />
      <Page>
        <Route
          path="/:categoryName?"
          component={Posts}
        />
      </Page>
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
)(Home);
