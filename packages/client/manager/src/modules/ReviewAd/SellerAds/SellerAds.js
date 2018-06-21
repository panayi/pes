import React from 'react';
import * as R from 'ramda';
import { withProps } from 'recompose';
import { Switch, Route, withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import propSelector from '@pesposa/core/src/utils/propSelector';
import * as modelPaths from '@pesposa/core/src/config/modelPaths';
import withSellerAds from 'hocs/withSellerAds/withSellerAds';
import AdsList from 'modules/AdsList/AdsList';
import Ad from 'modules/Ad/Ad';

const getFirebasePath = ad => `/${modelPaths.ADS.string}/${ad.id}`;

const styles = {
  root: {
    display: 'flex',
    flex: 1,
    height: '100%',
  },
};

const SellerAds = ({ ads, basePath, isLoaded, classes }) => (
  <div className={classes.root}>
    <Switch>
      <Route
        exact
        path={basePath}
        render={() => (
          <AdsList
            id="sellerAds"
            ads={ads}
            basePath={basePath}
            getFirebasePath={getFirebasePath}
            isLoaded
          />
        )}
      />
      <Route
        path={`${basePath}/:otherAdId`}
        render={routeProps => {
          const adId = routeProps.match.params.otherAdId;
          const ad = R.find(R.propEq('id', adId), ads);

          return (
            <React.Fragment>
              <AdsList
                id="sellerAds"
                ads={ads}
                isLoaded={isLoaded}
                basePath={basePath}
                selected={adId}
                getFirebasePath={getFirebasePath}
              />
              <Ad adId={adId} ad={ad} />
            </React.Fragment>
          );
        }}
      />
    </Switch>
  </div>
);

export default R.compose(
  withSellerAds(propSelector('seller')),
  withProps(({ isLoaded }) => ({
    isLoaded:
      isLoaded.publishedAds && isLoaded.rejectedAds && isLoaded.deletedAds,
  })),
  withRouter,
  withStyles(styles),
)(SellerAds);
