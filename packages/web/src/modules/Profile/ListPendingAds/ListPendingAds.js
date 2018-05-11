import React from 'react';
import { noop } from 'ramda-adjunct';
import EmptyHero from 'components/EmptyHero/EmptyHero';
import ListAds from 'components/ListAds/ListAds';

const noResults = (
  <EmptyHero tagline="You have no listings that are pending publish" />
);

const ListPendingAds = ({ createdAds }) => (
    <ListAds hits={createdAds} loadNextPage={noop} noResults={noResults} />
  );

export default ListPendingAds;
