/* @flow */
import React, { Component } from 'react';
import R from 'ramda';
import { withProps } from 'recompose';
import Masonry from 'react-masonry-infinite';
import { Configure } from 'react-instantsearch/dom';
import { connectInfiniteHits } from 'react-instantsearch/connectors';
import PostCard from '../Card';
import { sizesSelector, searchParamsSelector } from './feed';

type Props = {
  categoryName: String,
  hits: Array<Post>,
  hasMore: Boolean,
  refine: Function,
  sidebarWidth: Number,
  sizes: Array<Object>,
  searchParams: Object,
};

const COLUMN_WIDTH = 350;


export class Posts extends Component<Props> {
  static defaultProps = {
    hits: [],
  };

  render() {
    const { hits, hasMore, refine, sizes, searchParams } = this.props;

    return (
      <div>
        <Masonry
          sizes={sizes}
          hasMore={hasMore}
          loadMore={refine}
        >
          {
            R.addIndex(R.map)((post, index) => (
              <PostCard
                // FIXME: Should not use index for key
                key={index}
                post={post}
                width={COLUMN_WIDTH}
              />
            ), hits)
          }
        </Masonry>
        <Configure {...searchParams} />
      </div>
    );
  }
}

export default R.compose(
  connectInfiniteHits,
  withProps(props => ({
    sizes: sizesSelector({
      columnWidth: COLUMN_WIDTH,
      gutter: 20,
      maxScreenWidth: 5000,
      // FIXME: use variable for Page margin
      wastedWidth: props.sidebarWidth + (2 * 16),
    }),
    searchParams: searchParamsSelector(props),
  })),
)(Posts);
