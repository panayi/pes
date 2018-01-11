/* @flow */
import React from 'react';
import { Route } from 'react-router-dom';
import Sidebar from 'components/atoms/Sidebar';
import Page from 'components/atoms/Page';
import Layout from 'components/organisms/Layout';
import SearchAds from 'components/organisms/SearchAds';
import Ads from './ads';

const Home = () => (
  <Layout>
    <Sidebar>
      <SearchAds.Filter />
    </Sidebar>
    <Page>
      <Route path="/:category?" component={Ads} />
    </Page>
  </Layout>
);

export default Home;
