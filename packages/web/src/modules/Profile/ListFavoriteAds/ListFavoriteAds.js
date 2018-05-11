import React from 'react';
import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { connectData } from 'lib/connectData';
import { models } from 'store/firebase/data';
import ListAds from 'components/ListAds/ListAds';
import EmptyHero from 'components/EmptyHero/EmptyHero';
import Search from 'modules/Search/Search';
import FetchAdsProgress from 'modules/Search/FetchAdsProgress/FetchAdsProgress';

const noResults = <EmptyHero tagline="You haven't favorited anything yet" />;

const ListFavoriteAds = ({ favoriteAds }) => {
  if (isNilOrEmpty(favoriteAds)) {
    return <FetchAdsProgress noResults={noResults} showNoResults />;
  }

  return (
    <Search params={{ ids: R.pluck('id', favoriteAds) }}>
      {props => (
        <React.Fragment>
          <ListAds {...props} sidebarWidth={0} />
          <FetchAdsProgress noResults={noResults} />
        </React.Fragment>
      )}
    </Search>
  );
};

const mapDataToProps = {
  favoriteAds: models.favorites.all,
};

export default connectData(mapDataToProps)(ListFavoriteAds);
