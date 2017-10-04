/* @flow */
import React from 'react';
import R from 'ramda';
import { Flex } from 'rebass';
import { withProps } from 'recompose';
import Search from '../../search';
import PostsFeed from '../../postsFeed';

type Props = {
  categoryName: String,
  sidebarWidth: String,
};

const Posts = (props: Props) => (
  <Flex column align="center">
    <Search />
    <PostsFeed
      categoryName={props.categoryName}
      sidebarWidth={props.sidebarWidth}
    />
  </Flex>
);

export default R.compose(
  withProps((props: Props) => ({
    categoryName: R.path(['match', 'params', 'categoryName'], props),
  })),
)(Posts);
