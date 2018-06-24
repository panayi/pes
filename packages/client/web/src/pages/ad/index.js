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
import { models } from '@pesposa/client-core/src/store/firebase/data';
import { selectors as routerSelectors } from '@pesposa/client-core/src/store/router';
import hydrateAd from '@pesposa/client-core/src/modules/Ad/hydrateAd';
import Layout from '@pesposa/client-core/src/layouts/Layout/Layout';
import AdPlace from '@pesposa/client-core/src/modules/Ad/AdPlace/AdPlace';
import NotFound from 'components/NotFound/NotFound';
import ViewAd from 'modules/ViewAd/ViewAd';
import Header from 'pages/components/Header/Header';

// type Props = {
//   adId: string,
//   ad: Ad,
// };

const Content = ({ ad, adId, location }) => (
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
    <ViewAd ad={ad} adId={adId} />
  </React.Fragment>
);

const AdPage = props => {
  const { notFound } = props;

  return notFound ? (
    <NotFound />
  ) : (
    <React.Fragment>
      <XsScreenHidden component={React.Fragment}>
        <Layout header={<Header />} fixed>
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
};

export default R.compose(
  setStatic('getInitialProps', async ({ match, store, res }) => {
    const adId = routerSelectors.routeParamSelector('adId')({ match });
    let props = {
      adId,
    };
    const state = store.getState();
    const adIdSelector = propSelector('adId');
    const adConnection = models.ads.one(adIdSelector);
    const adQuery = adConnection.query(state, props).path;
    const categoriesQuery = models.categories.all.query(state, props).path;

    await store.firebase.promiseEvents([
      { path: adQuery, type: 'once' },
      { path: categoriesQuery, type: 'once' },
      {
        path: modelPaths.TRANSLATIONS('en', 'categories').string,
        type: 'once',
      },
    ]);
    const ad = adConnection.selector(store.getState(), props);

    if (R.isNil(ad)) {
      res.status(404);
      return {
        notFound: true,
      };
    }

    props = { sellerId: ad.seller, sellerType: ad.sellerType };

    await store.firebase.promiseEvents([
      {
        path: models
          .profiles(propSelector('sellerId'), propSelector('sellerType'))
          .query(state, props).path,
        type: 'once',
      },
      {
        path: models
          .avatars(propSelector('sellerId'), propSelector('sellerType'))
          .query(state, props).path,
        type: 'once',
      },
    ]);

    return store.getState();
  }),
  withProps(
    createStructuredSelector({
      adId: routerSelectors.routeParamSelector('adId'),
    }),
  ),
  hydrateAd(propSelector('adId')),
)(AdPage);
