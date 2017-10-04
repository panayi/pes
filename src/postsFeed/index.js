/* @flow */
import React, { Component } from 'react';
import R from 'ramda';
import { withProps } from 'recompose';
import Masonry from 'react-masonry-infinite';
import { connectInfiniteHits } from 'react-instantsearch/connectors';
import PostCard from './Card';
import { sizesSelector } from './feed';
import ConfigureSearchParams from './ConfigureSearchParams';

type Props = {
  categoryName: String,
  hits: Array<Post>,
  hasMore: Boolean,
  refine: Function,
  sidebarWidth: Number,
  sizes: Array<Object>,
};

const COLUMN_WIDTH = 350;


export class PostsFeed extends Component<Props> {
  static defaultProps = {
    hits: [],
  };

  componentDidUpdate(prevProps: Props) {
    // If the search hits have changed,
    // force Masonry to recalulate layout
    if (this.masonry && !R.equals(prevProps.hits, this.props.hits)) {
      this.masonry.forcePack();
    }
  }

  masonry: ?Object

  render() {
    const { categoryName, hits, hasMore, refine, sizes } = this.props;

    return (
      <div>
        <Masonry
          ref={(instance) => { this.masonry = instance; }}
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
        <ConfigureSearchParams categoryName={categoryName} />
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
  })),
)(PostsFeed);
