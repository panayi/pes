import React from 'react';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { withProps } from 'recompose';
import { createSelector, createStructuredSelector } from 'reselect';
import propSelector from '@pesposa/core/src/utils/propSelector';
import { connectData } from '@pesposa/client-core/src/lib/connectData';
import { models } from '@pesposa/client-core/src/store/firebase/data';
import ListAds from '@pesposa/client-core/src/modules/ListAds/ListAds';
import EmptyHero from '@pesposa/client-core/src/components/EmptyHero/EmptyHero';
import Search from '@pesposa/client-core/src/modules/Search/Search';
import FetchAdsProgress from '@pesposa/client-core/src/modules/Search/FetchAdsProgress/FetchAdsProgress';

const noResults = <EmptyHero tagline="You haven't favorited anything yet" />;

const ListFavoriteAds = ({ favoriteAdIds, isLoaded }) => {
  if (!isLoaded.favoriteAds) {
    return <FetchAdsProgress noResults={noResults} showIsLoading />;
  }

  if (isNilOrEmpty(favoriteAdIds)) {
    return <FetchAdsProgress noResults={noResults} showNoResults />;
  }

  return (
    <Search params={{ ids: favoriteAdIds }}>
      {props => (
        <React.Fragment>
          <ListAds {...props} sidebarWidth={0} />
          <FetchAdsProgress noResults={noResults} hideNoMoreResults />
        </React.Fragment>
      )}
    </Search>
  );
};

const favoriteAdIdsSelector = createSelector(
  propSelector('favoriteAds'),
  R.compose(
    R.keys,
    R.filter(R.identity),
    R.defaultTo([]),
  ),
);

const mapDataToProps = {
  favoriteAds: models.favorites.allObjects,
};

export default R.compose(
  connectData(mapDataToProps),
  withProps(
    createStructuredSelector({
      favoriteAdIds: favoriteAdIdsSelector,
    }),
  ),
)(ListFavoriteAds);
