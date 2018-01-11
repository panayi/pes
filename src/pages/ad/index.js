/* @flow */
import React from 'react';
import * as R from 'ramda';
import { withProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { Route } from 'react-router-dom';
import { connectData } from 'lib/connectData';
import urlParamsSelector from 'utils/urlParamsSelector';
import { models } from 'store/data';
import Page from 'components/atoms/Page';
import Layout from 'components/organisms/Layout';
import ViewAd from 'components/organisms/ViewAd';
import EditAd from './edit';

type Props = {
  adId: String,
  ad: Ad,
};

const AdPage = ({ ad, adId }: Props) => (
  <Layout>
    <Page fixed>
      <ViewAd ad={ad} adId={adId} />
      <Route
        path="/i/:adId/edit"
        render={props => <EditAd {...props} ad={ad} adId={adId} />}
      />
    </Page>
  </Layout>
);

export default R.compose(
  withProps(
    createStructuredSelector({
      adId: R.compose(R.prop('adId'), urlParamsSelector),
    }),
  ),
  connectData({
    ad: models.ads.one((state, props) => props.adId),
  }),
)(AdPage);
