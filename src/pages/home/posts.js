/* @flow */
import React from 'react';
import * as R from 'ramda';
import { Grid } from 'material-ui';
import { withProps } from 'recompose';
import SearchInput from 'components/molecules/SearchInput';
import PostsList from './PostsList';

type Props = {
  categoryName: String,
};

const Posts = (props: Props) => (
  <Grid
    container
    align="center"
    direction="column"
  >
    <SearchInput />
    <PostsList categoryName={props.categoryName} />
  </Grid>
);

export default R.compose(
  withProps((props: Props) => ({
    categoryName: R.path(['match', 'params', 'categoryName'], props),
  })),
)(Posts);
