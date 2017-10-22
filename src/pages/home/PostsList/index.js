/* @flow */
import React from 'react';
import { connectInfiniteHits } from 'react-instantsearch/connectors';
import BasePostsList from 'components/organisms/PostsList';
import { WIDTH } from 'components/organisms/Sidebar';
import ConfigureSearchParams from '../ConfigureSearchParams';

type Props = {
  hits: Array<Object>,
  hasMore: Boolean,
  refine: Function,
  categoryName: String,
};

const PostsList = ({ categoryName, hits, hasMore, refine }: Props) => (
  <div>
    <BasePostsList
      hits={hits}
      hasMore={hasMore}
      loadMore={refine}
      sidebarWidth={WIDTH}
    />
    <ConfigureSearchParams categoryName={categoryName} />
  </div>
);

export default connectInfiniteHits(PostsList);
