/* @flow */
import React, { Component } from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { withProps } from 'recompose';
import Masonry from 'react-masonry-infinite';
import { postsByCategorySelector } from '../posts';
import PostCard from '../Card';
import { sizesSelector } from './feed';

type Props = {
  categoryName: String,
  posts: Array<Post>,
  sidebarWidth: Number,
  sizes: Array<Object>,
};

const COLUMN_WIDTH = 350;


export class Posts extends Component<Props> {
  static defaultProps = {
    posts: [],
  };

  render() {
    const { posts, sizes } = this.props;

    return (
      <Masonry sizes={sizes}>
        {
          R.addIndex(R.map)((post, index) => (
            <PostCard
              // FIXME: Should not use index for key
              key={index}
              post={post}
              width={COLUMN_WIDTH}
            />
          ), posts)
        }
      </Masonry>
    );
  }
}

export default R.compose(
  firebaseConnect(({ categoryName }) => (
    categoryName
      ? [`posts#orderByChild=category&equalTo=${categoryName}`]
      : ['posts']
  )),
  connect((state, { categoryName }) => ({
    posts: postsByCategorySelector(categoryName)(state),
  })),
  withProps(({ sidebarWidth }) => ({
    sizes: sizesSelector({
      columnWidth: COLUMN_WIDTH,
      gutter: 20,
      maxScreenWidth: 5000,
      // FIXME: use variable for Page margin
      wastedWidth: sidebarWidth + (2 * 16),
    }),
  })),
)(Posts);
