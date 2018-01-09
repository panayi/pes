/* @flow */
import React from 'react';
import { Route } from 'react-router-dom';
import Sidebar from 'components/atoms/Sidebar';
import Page from 'components/atoms/Page';
import Layout from 'components/organisms/Layout';
import FilterAds from 'components/organisms/FilterAds';
import Ads from './ads';

const Home = () => (
  <Layout>
    <Sidebar>
      <FilterAds />
    </Sidebar>
    <Page>
      <Route path="/:categoryName?" component={Ads} />
    </Page>
  </Layout>
);

export default Home;
