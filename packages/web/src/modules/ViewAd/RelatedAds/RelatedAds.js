import React from 'react';
import SearchProvider from 'modules/Search/Provider/Provider';
import { constants as searchConstants } from 'store/search';
import ListRelatedAds from './ListRelatedAds/ListRelatedAds';

const RelatedAds = ({ ad, adId }) => (
  <SearchProvider id={searchConstants.RELATED_ADS_SEARCH_ID}>
    <ListRelatedAds ad={ad} adId={adId} />
  </SearchProvider>
);

export default RelatedAds;
