/* @flow */
import React from 'react';
import * as R from 'ramda';
import { Route } from 'react-router-dom';
import { withProps } from 'recompose';
import { createSelector, createStructuredSelector } from 'reselect';
import { InstantSearch } from 'react-instantsearch/dom';
import propsSelector from '../../lib/selectors/props';
import Page from '../../lib/components/Page';
import { modelConnections, connectData } from '../../firebase';
import Sidebar, { type LinkType } from '../layout/Sidebar';
import Layout from '../layout';
import Posts from './posts';

type Props = {
  categoryLinks: Array<LinkType>,
};

const Home = ({ categoryLinks }: Props) => (
  <InstantSearch
    appId={process.env.REACT_APP_ALGOLIA_APP_ID}
    apiKey={process.env.REACT_APP_ALGOLIA_SEARCH_KEY}
    indexName={process.env.REACT_APP_ALGOLIA_INDEX_NAME}
  >
    <Layout>
      <Sidebar
        links={categoryLinks}
      />
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
