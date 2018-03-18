import React from 'react';
import ListAds from 'components/ListAds/ListAds';
import Search from 'modules/Search/Search';

const ListUserAds = ({ params }) => (
  <Search params={params}>
    {props => <ListAds {...props} sidebarWidth={0} />}
  </Search>
);

export default ListUserAds;
