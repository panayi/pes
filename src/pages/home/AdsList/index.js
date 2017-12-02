/* @flow */
import React from 'react';
import * as R from 'ramda';
import { connectInfiniteHits } from 'react-instantsearch/connectors';
import BaseAdsList from 'components/organisms/AdsList';
import ConfigureSearchParams from '../ConfigureSearchParams';

type Props = {
  hits: Array<Object>,
  hasMore: Boolean,
  refine: Function,
  categoryName: String,
};

const AdsList = ({ categoryName, hits, hasMore, refine }: Props) => (
  <div>
    <BaseAdsList hits={hits} hasMore={hasMore} loadMore={refine} />
    <ConfigureSearchParams categoryName={categoryName} />
  </div>
);

export default R.compose(connectInfiniteHits)(AdsList);
