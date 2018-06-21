import React from 'react';
import * as R from 'ramda';
import { createSelector, createStructuredSelector } from 'reselect';
import { withProps } from 'recompose';
import { Switch, Route } from 'react-router-dom';
import propSelector from '@pesposa/core/src/utils/propSelector';
import * as modelPaths from '@pesposa/core/src/config/modelPaths';
import { connectData } from '@pesposa/client-core/src/lib/connectData';
import { models } from '@pesposa/client-core/src/store/firebase/data';
import AdsList from 'modules/AdsList/AdsList';
import ReviewAd from 'modules/ReviewAd/ReviewAd';
import Layout from 'pages/components/Layout/Layout';

const BASE_PATH = '/tasks/review-ads';

const getFirebasePath = ad => `/${modelPaths.REVIEW_AD_TASKS.string}/${ad.id}`;

const ReviewAds = ({ ads, isLoaded }) => (
  <Layout title="Review Ads">
    <Switch>
      <Route
        path={BASE_PATH}
        exact
        render={() => (
          <AdsList
            id="reviewAds"
            searchPlaceholder="Find tasks"
            ads={ads}
            basePath={BASE_PATH}
            isLoaded={isLoaded.reviewAdTasks}
            getFirebasePath={getFirebasePath}
          />
        )}
      />
      <Route
        path={`${BASE_PATH}/:adId/:tab?`}
        render={routeProps => {
          const adId = routeProps.match.params.otherAdId;

          return (
            <React.Fragment>
              <AdsList
                id="reviewAds"
                searchPlaceholder="Find tasks"
                ads={ads}
                basePath={BASE_PATH}
                selected={adId}
                isLoaded={isLoaded.reviewAdTasks}
                getFirebasePath={getFirebasePath}
              />
              <ReviewAd {...routeProps} ads={ads} basePath={BASE_PATH} />
            </React.Fragment>
          );
        }}
      />
    </Switch>
  </Layout>
);

const adsSelector = createSelector(
  propSelector('reviewAdTasks'),
  R.compose(
    R.map(({ id, afterAd }) => R.merge(afterAd, { id })),
    R.filter(R.identity),
    R.defaultTo([]),
  ),
);

const mapDataToProps = {
  reviewAdTasks: models.reviewAdTasks.all,
};

export default R.compose(
  connectData(mapDataToProps),
  withProps(
    createStructuredSelector({
      ads: adsSelector,
    }),
  ),
)(ReviewAds);
