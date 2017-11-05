/* @flow */
import React, { Component } from 'react';
import * as R from 'ramda';
import { withProps } from 'recompose';
import Masonry from 'react-masonry-infinite';
import theme from 'config/theme';
import PostCard from '../PostCard';
import { sizesSelector } from './utils';

type Props = {
  hits: Array<Post>,
  loadMore: Function,
  hasMore: Boolean,
  sizes: Array<Object>,
};

const COLUMN_WIDTH = 280;
const GUTTER = 20;

export class Posts extends Component<Props> {
  static defaultProps = {
    hits: [],
  };

  // TODO: Find a way to avoid this
  // Seems it's only needed when changing filter (categories),
  // not when loading more.
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
  withProps({
    sizes: sizesSelector({
      columnWidth: COLUMN_WIDTH,
      gutter: GUTTER,
      maxScreenWidth: 5000,
      wastedWidth: theme.custom.sidebarWidth + (2 * GUTTER),
    }),
  }),
)(Posts);
