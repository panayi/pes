/* @flow */
import React from 'react';
import * as R from 'ramda';
import { withProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { Route } from 'react-router-dom';
import { urlParamsSelector, propSelector } from 'pesposa-utils';
import hydrateAd from 'hocs/hydrateAd';
import Layout from 'layouts/Layout/Layout';
import ViewAd from 'modules/ViewAd/ViewAd';
import Header from 'pages/components/Header/Header';
import EditAd from './edit';

type Props = {
  adId: String,
  ad: Ad,
};

const AdPage = ({ ad, adId }: Props) => (
  <Layout header={Header} fixed>
    <ViewAd ad={ad} adId={adId} />
    <Route
      path="/i/:adId/edit"
      render={props => <EditAd {...props} ad={ad} adId={adId} />}
    />
  </Layout>
);

export default R.compose(
  withProps(
    createStructuredSelector({
      adId: R.compose(R.prop('adId'), urlParamsSelector),
    }),
  ),
  hydrateAd(propSelector('adId')),
)(AdPage);
