/* @flow */
import React from 'react';
import * as R from 'ramda';
import { Route } from 'react-router-dom';
import { withProps } from 'recompose';
import { createSelector, createStructuredSelector } from 'reselect';
import { connectData } from 'lib/connectData';
import propSelector from 'utils/propSelector';
import { models } from 'store/data';
import translate from 'components/hocs/translate';
import Page from 'components/molecules/Page';
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
  propSelector('t'),
  propSelector('categories'),
  (t, categories) =>
    R.map(
      ({ key }) => ({
        label: t(key),
        to: `/${key}`,
      }),
      categories,
    ),
);

export default R.compose(
  connectData({ categories: models.categories.all }),
  translate('home'),
  withProps(
    createStructuredSelector({
      categoryLinks: categoryLinksSelector,
    }),
  ),
)(Home);
