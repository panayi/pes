/* @flow */
import React from 'react';
import * as R from 'ramda';
import { Route } from 'react-router-dom';
import { withProps } from 'recompose';
import { createSelector, createStructuredSelector } from 'reselect';
import propsSelector from 'utils/propsSelector';
import Page from 'components/molecules/Page';
import { modelConnections, connectData } from 'services/connectData';
import Sidebar, { type LinkType } from 'components/organisms/Sidebar';
import Layout from 'components/organisms/Layout';
import Ads from './ads';

type Props = {
  categoryLinks: Array<LinkType>,
};

const Home = ({ categoryLinks }: Props) => (
  <Layout>
    <Sidebar links={categoryLinks} />
    <Page>
      <Route path="/:categoryName?" component={Ads} />
    </Page>
  </Layout>
);

const categoryLinksSelector = createSelector(
  R.compose(R.values, R.propOr({}, 'categories'), propsSelector),
  R.map(({ name }) => ({
    label: name,
    to: `/${name}`,
  })),
);

export default R.compose(
  connectData({ categories: modelConnections.categories.all }),
  withProps(
    createStructuredSelector({
      categoryLinks: categoryLinksSelector,
    }),
  ),
)(Home);
