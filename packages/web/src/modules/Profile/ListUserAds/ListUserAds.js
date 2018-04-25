import React from 'react';
import ListAds from 'components/ListAds/ListAds';
import Search from 'modules/Search/Search';

const ListUserAds = ({ params, noResults }) => (
  <Search params={params}>
    {props => <ListAds {...props} sidebarWidth={0} noResults={noResults} />}
  </Search>
);

export default ListUserAds;
