/* @flow */
import React from 'react';
import { Route } from 'react-router-dom';
import setCurrentUserLocation from 'components/hocs/setCurrentUserLocation';
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

export default setCurrentUserLocation(Home);
