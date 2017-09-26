/* @flow */
import React from 'react';
import R from 'ramda';
import { withProps } from 'recompose';
import PostsFeed from '../../posts/Feed';

type Props = {
  categoryName: String,
};

const Posts = (props: Props) => (
  <PostsFeed categoryName={props.categoryName} />
);

export default R.compose(
  withProps((props: Props) => ({
    categoryName: R.path(['match', 'params', 'categoryName'], props),
  })),
)(Posts);
