/* @flow */
import React from 'react';
import * as R from 'ramda';
import { Grid } from 'material-ui';
import { withProps } from 'recompose';
import Search from '../../search';
import PostsList from './PostsList';

type Props = {
  categoryName: String,
  sidebarWidth: String,
};

const Posts = (props: Props) => (
  <Grid
    container
    align="center"
    direction="column"
  >
    <Search />
    <PostsList
      categoryName={props.categoryName}
      sidebarWidth={props.sidebarWidth}
    />
  </Grid>
);

export default R.compose(
  withProps((props: Props) => ({
    categoryName: R.path(['match', 'params', 'categoryName'], props),
  })),
)(Posts);
