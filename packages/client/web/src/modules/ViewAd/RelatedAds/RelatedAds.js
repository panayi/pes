import React from 'react';
import SearchProvider from '@pesposa/client-core/src/modules/Search/Provider/Provider';
import { constants as searchConstants } from '@pesposa/client-core/src/store/search';
import ListRelatedAds from './ListRelatedAds/ListRelatedAds';

const RelatedAds = props => (
  <SearchProvider id={searchConstants.RELATED_ADS_SEARCH_ID}>
    <ListRelatedAds {...props} />
  </SearchProvider>
);

export default RelatedAds;
