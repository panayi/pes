/* @flow */
import React from 'react';
import * as R from 'ramda';
import { withProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { propSelector } from 'pesposa-utils';
import { selectors as routerSelectors } from 'store/router';
import hydrateAd from 'hocs/hydrateAd';
import Layout from 'layouts/Layout/Layout';
import ViewAd from 'modules/ViewAd/ViewAd';
import Header from 'pages/components/Header/Header';
import EditAd from './edit';

type Props = {
  adId: string,
  ad: Ad,
  legacy: ?boolean,
};

const AdPage = ({ ad, adId, legacy }: Props) => (
  <Layout header={Header} fixed>
    <Helmet>
      <title>{`${ad.title} in ${R.path(
        ['location', 'address', 'city'],
        ad,
      )} - Pesposa`}</title>
    </Helmet>
    <ViewAd ad={ad} adId={adId} legacy={legacy} />
    {!legacy && (
      <Route
        path="/i/:adId/edit"
        render={props => <EditAd {...props} ad={ad} adId={adId} />}
      />
    )}
  </Layout>
);

export default R.compose(
  withProps(
    createStructuredSelector({
      adId: routerSelectors.routeParamSelector('adId'),
    }),
  ),
  hydrateAd(propSelector('adId'), propSelector('legacy')),
)(AdPage);
