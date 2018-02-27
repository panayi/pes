/* @flow */
import React from 'react';
import * as R from 'ramda';
import { withProps, setStatic } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import propSelector from '@pesposa/core/src/utils/propSelector';
import getMetaTags from 'utils/getMetaTags';
import { models } from 'store/firebase/data';
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
    <Helmet
      {...getMetaTags({
        title: `${ad.title} in ${R.path(['location', 'address', 'city'], ad)}`,
      })}
    />
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
  setStatic('getInitialProps', async ({ store, match }) => {
    const props = {
      adId: match.params,
      legacy: R.test(/^\/il/, match.path),
    };
    const state = store.getState();
    const adConnection = models
      .ads(propSelector('legacy'))
      .one(propSelector('adId'));
    const adQuery = adConnection.query(state, props);
    await store.firebase.promiseEvents([{ path: adQuery, type: 'once' }]);

    const ad = adConnection.selector(store.getState(), props);
    await store.firebase.promiseEvents([
      {
        path: models.users
          .one(propSelector('userId'))
          .query(state, { userId: ad.user }),
        type: 'once',
      },
    ]);
  }),
  withProps(
    createStructuredSelector({
      adId: routerSelectors.routeParamSelector('adId'),
    }),
  ),
  hydrateAd(propSelector('adId'), propSelector('legacy')),
)(AdPage);
