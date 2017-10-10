/* @flow */
import React from 'react';
import * as R from 'ramda';
import { Flex } from 'rebass';
import { withProps } from 'recompose';
import Search from '../../search';
import PostsList from './PostsList';

type Props = {
  categoryName: String,
  sidebarWidth: String,
};

const Posts = (props: Props) => (
  <Flex column align="center">
    <Search />
    <PostsList
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
