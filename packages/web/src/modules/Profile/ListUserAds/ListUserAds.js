import React from 'react';
import ListAds from 'components/ListAds/ListAds';
import Search from 'modules/Search/Search';
import FetchAdsProgress from 'modules/Search/FetchAdsProgress/FetchAdsProgress';

const ListUserAds = ({ params, noResults }) => (
  <Search params={params}>
    {props => (
      <React.Fragment>
        <ListAds {...props} sidebarWidth={0} noResults={noResults} />
        <FetchAdsProgress noResults={noResults} />
      </React.Fragment>
    )}
  </Search>
);

export default ListUserAds;
