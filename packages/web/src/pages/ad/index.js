/* @flow */
import React from 'react';
import * as R from 'ramda';
import { withProps, setStatic } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import { XsScreen, XsScreenHidden } from 'react-responsive-redux';
import propSelector from '@pesposa/core/src/utils/propSelector';
import { buildUrl } from '@pesposa/core/src/services/imgix';
import * as modelPaths from '@pesposa/core/src/config/modelPaths';
import getMetaTags from 'utils/getMetaTags';
import { models } from 'store/firebase/data';
import { selectors as routerSelectors } from 'store/router';
import needsBetaUser from 'hocs/needsBetaUser';
import hydrateAd from 'hocs/hydrateAd';
import Layout from 'layouts/Layout/Layout';
import AdPlace from 'components/AdPlace/AdPlace';
import ViewAd from 'modules/ViewAd/ViewAd';
import Header from 'pages/components/Header/Header';

type Props = {
  adId: string,
  ad: Ad,
  legacy: ?boolean,
};

const Content = ({ ad, adId, legacy, location }: Props) => (
  <React.Fragment>
    <AdPlace ad={ad}>
      {({ place }) => (
        <Helmet
          {...getMetaTags({
            title: ad ? `${ad.title} in ${place} - Pesposa` : null,
            description: R.prop('body', ad),
            image: R.compose(
              buildUrl,
              R.prop('fullPath'),
              R.head,
              R.values,
              R.propOr({}, 'images'),
            )(ad),
            path: location.pathname,
          })}
        />
      )}
    </AdPlace>
    <ViewAd ad={ad} adId={adId} legacy={legacy} />
  </React.Fragment>
);

const AdPage = (props: Props) => (
  <React.Fragment>
    <XsScreenHidden component={React.Fragment}>
      <Layout header={Header} fixed>
        <Content {...props} />
      </Layout>
    </XsScreenHidden>
    <XsScreen component={React.Fragment}>
      <Layout>
        <Content {...props} />
      </Layout>
    </XsScreen>
  </React.Fragment>
);

const legacySelector = R.compose(R.test(/^\/il/), R.path(['match', 'path']));

export default R.compose(
  setStatic('getInitialProps', async ({ match, store }) => {
    const props = {
      adId: routerSelectors.routeParamSelector('adId')({ match }),
      legacy: legacySelector({ match }),
    };
    const state = store.getState();
    const adIdSelector = propSelector('adId');
    const adConnection = models.ads(propSelector('legacy')).one(adIdSelector);
    const adQuery = adConnection.query(state, props).path;
    const adImagesConnection = models.adImages(adIdSelector).allObjects;
    const adImagesQuery = adImagesConnection.query(state, props).path;
    const categoriesQuery = models.categories.all.query(state, props).path;

    await store.firebase.promiseEvents([
      { path: adQuery, type: 'once' },
      { path: adImagesQuery, type: 'once' },
      { path: categoriesQuery, type: 'once' },
      {
        path: modelPaths.TRANSLATIONS('en', 'categories').string,
        type: 'once',
      },
    ]);
    const ad = adConnection.selector(store.getState(), props);

    if (R.isNil(ad)) {
      // res.redirect('/');
      return store.getState();
    }

    if (ad.user) {
      await store.firebase.promiseEvents([
        {
          path: models
            .profiles(propSelector('userId'))
            .query(state, { userId: ad.user }).path,
          type: 'once',
        },
      ]);
    }

    return store.getState();
  }),
  needsBetaUser,
  withProps(
    createStructuredSelector({
      adId: routerSelectors.routeParamSelector('adId'),
      legacy: legacySelector,
    }),
  ),
  hydrateAd(propSelector('adId'), propSelector('legacy')),
)(AdPage);
