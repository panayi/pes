import React from 'react';
import { constants as searchConstants } from '@pesposa/client-core/src/store/search';
import SearchProvider from '@pesposa/client-core/src/modules/Search/Provider/Provider';
import ListFavoriteAds from './ListFavoriteAds/ListFavoriteAds';

const UserFavoriteAds = () => (
  <SearchProvider id={searchConstants.USER_FAVORITES_SEARCH_ID}>
    <ListFavoriteAds />
  </SearchProvider>
);

export default UserFavoriteAds;
