/* @flow */
import React from 'react';
import * as R from 'ramda';
import { connectInfiniteHits } from 'react-instantsearch/connectors';
import BasePostsList from 'components/organisms/PostsList';
import ConfigureSearchParams from '../ConfigureSearchParams';

type Props = {
  hits: Array<Object>,
  hasMore: Boolean,
  refine: Function,
  categoryName: String,
};

const PostsList = ({ categoryName, hits, hasMore, refine }: Props) => (
  <div>
    <BasePostsList hits={hits} hasMore={hasMore} loadMore={refine} />
    <ConfigureSearchParams categoryName={categoryName} />
  </div>
);

export default R.compose(connectInfiniteHits)(PostsList);
