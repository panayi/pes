import React from 'react';
import SearchProvider from '@pesposa/client-core/src/modules/Search/Provider/Provider';
import { constants as searchConstants } from '@pesposa/client-core/src/store/search';
import ListSimilarAds from './ListSimilarAds/ListSimilarAds';

const SimilarAds = props => (
  <SearchProvider id={searchConstants.RELATED_ADS_SEARCH_ID}>
    <ListSimilarAds {...props} />
  </SearchProvider>
);

export default SimilarAds;
