/* @flow */
import React, { Component } from 'react';
import R from 'ramda';
import { withProps } from 'recompose';
import Masonry from 'react-masonry-infinite';
import PostCard from './Card';
import { sizesSelector } from './posts';

type Props = {
  hits: Array<Post>,
  loadMore: Function,
  hasMore: Boolean,
  sidebarWidth: Number,
  sizes: Array<Object>,
};

const COLUMN_WIDTH = 350;


export class Posts extends Component<Props> {
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
    const { hits, hasMore, loadMore, sizes } = this.props;

    return (
      <div>
        <Masonry
          ref={(instance) => { this.masonry = instance; }}
          hasMore={hasMore}
          loadMore={loadMore}
          sizes={sizes}
        >
          {
            R.map(post => (
              <PostCard
                key={post.objectID}
                post={post}
                width={COLUMN_WIDTH}
              />
            ), hits)
          }
        </Masonry>
      </div>
    );
  }
}

export default R.compose(
  withProps(props => ({
    sizes: sizesSelector({
      columnWidth: COLUMN_WIDTH,
      gutter: 20,
      maxScreenWidth: 5000,
      // FIXME: use variable for Page margin
      wastedWidth: props.sidebarWidth + (2 * 16),
    }),
  })),
)(Posts);
