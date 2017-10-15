/* @flow */
import React from 'react';
import { connectInfiniteHits } from 'react-instantsearch/connectors';
import Posts from '../../../posts';
import { WIDTH } from '../../../layout/Sidebar';
import ConfigureSearchParams from '../ConfigureSearchParams';

type Props = {
  hits: Array<Object>,
  hasMore: Boolean,
  refine: Function,
  categoryName: String,
};

const PostsList = ({ categoryName, hits, hasMore, refine }: Props) => (
  <div>
    <Posts
      hits={hits}
      hasMore={hasMore}
      loadMore={refine}
      sidebarWidth={WIDTH}
    />
    <ConfigureSearchParams categoryName={categoryName} />
  </div>
);

export default connectInfiniteHits(PostsList);
