import React from 'react';
import * as R from 'ramda';
import { Switch, Route } from 'react-router-dom';
import * as sellerTypes from '@pesposa/core/src/config/sellerTypes';
import * as modelPaths from '@pesposa/core/src/config/modelPaths';
import { connectData } from '@pesposa/client-core/src/lib/connectData';
import { models } from '@pesposa/client-core/src/store/firebase/data';
import AdsList from 'modules/AdsList/AdsList';
import EditAd from 'modules/EditAd/EditAd';
import Layout from '../components/Layout/Layout';

const BASE_PATH = '/data/ads';

const getFirebasePath = ad => `/${modelPaths.ADS.string}/${ad.id}`;

const Ads = ({ ads, isLoaded }) => {
  const adsListProps = {
    id: 'ads',
    searchPlaceholder: 'Find ads',
    ads,
    basePath: BASE_PATH,
    isLoaded: isLoaded.ads,
    getFirebasePath,
  };

  return (
    <Layout title="Ads">
      <Switch>
        <Route
          path={BASE_PATH}
          exact
          render={() => <AdsList {...adsListProps} />}
        />
        <Route
          path={`${BASE_PATH}/:adId`}
          render={props => {
            const { adId } = props.match.params;
            return (
              <React.Fragment>
                <AdsList {...adsListProps} selected={adId} />
                <EditAd {...props} adId={adId} />
              </React.Fragment>
            );
          }}
        />
      </Switch>
    </Layout>
  );
};

Ads.defaultProps = {
  ads: [],
};

const mapDataToProps = {
  ads: models.ads.byChild('sellerType', R.always(sellerTypes.EXTERNAL_USER)),
};

export default R.compose(connectData(mapDataToProps))(Ads);
