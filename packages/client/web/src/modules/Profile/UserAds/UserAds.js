import React from 'react';
import * as R from 'ramda';
import { noop, isNilOrEmpty } from 'ramda-adjunct';
import { createSelector, createStructuredSelector } from 'reselect';
import { withProps } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import propSelector from '@pesposa/core/src/utils/propSelector';
import { deserializeAdSelector } from '@pesposa/core/src/selectors/ads';
import { connectData } from '@pesposa/client-core/src/lib/connectData';
import { models } from '@pesposa/client-core/src/store/firebase/data';
import ListAds from '@pesposa/client-core/src/modules/ListAds/ListAds';
import FetchAdsProgress from '@pesposa/client-core/src/modules/Search/FetchAdsProgress/FetchAdsProgress';
import NoResults from './NoResults/NoResults';

const styles = {
  root: {
    paddingBottom: 88,
  },
};

const UserAds = ({
  sellerAds,
  sold,
  userId,
  userType,
  isCurrentUser,
  isLoaded,
  classes,
}) => {
  const noResults = (
    <NoResults
      sold={sold}
      userId={userId}
      userType={userType}
      isCurrentUser={isCurrentUser}
    />
  );

  if (!isLoaded.allSellerAds && isNilOrEmpty(sellerAds)) {
    return <FetchAdsProgress noResults={noResults} showIsLoading />;
  }

  if (isNilOrEmpty(sellerAds)) {
    return <FetchAdsProgress noResults={noResults} showNoResults />;
  }

  return (
    <ListAds
      className={classes.root}
      hits={sellerAds}
      loadNextPage={noop}
      sidebarWidth={0}
    />
  );
};

const selledAdsSelector = createSelector(
  propSelector(['sold']),
  propSelector(['allSellerAds']),
  (sold, allSellerAds) =>
    R.compose(
      R.map(ad => deserializeAdSelector({ ad })),
      R.filter(({ sold: adIsSold }) => (sold ? adIsSold : !adIsSold)),
      R.defaultTo([]),
    )(allSellerAds),
);

const mapDataToProps = {
  allSellerAds: models.sellerAds(propSelector('userId')).all,
};

export default R.compose(
  connectData(mapDataToProps),
  withProps(
    createStructuredSelector({
      sellerAds: selledAdsSelector,
    }),
  ),
  withStyles(styles),
)(UserAds);
