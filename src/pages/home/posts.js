/* @flow */
import React from 'react';
import R from 'ramda';
import { Flex } from 'rebass';
import { withProps } from 'recompose';
import PostsFeed from '../../posts/Feed';

type Props = {
  categoryName: String,
  sidebarWidth: String,
};

const Posts = (props: Props) => (
  <Flex
    width={`calc(100% - ${props.sidebarWidth}px)`}
    justify="center"
  >
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
