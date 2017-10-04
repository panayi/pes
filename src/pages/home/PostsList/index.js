/* @flow */
import React from 'react';
import { connectInfiniteHits } from 'react-instantsearch/connectors';
import Posts from '../../../posts';
import ConfigureSearchParams from '../ConfigureSearchParams';

type Props = {
  hits: Array<Object>,
  hasMore: Boolean,
  refine: Function,
  categoryName: String,
  sidebarWidth: Number,
};

const PostsList = ({ categoryName, hits, hasMore, refine, sidebarWidth }: Props) => (
  <div>
    <Posts
      hits={hits}
      hasMore={hasMore}
      loadMore={refine}
      sidebarWidth={sidebarWidth}
    />
    <ConfigureSearchParams categoryName={categoryName} />
  </div>
);

export default connectInfiniteHits(PostsList);
