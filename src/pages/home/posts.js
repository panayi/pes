/* @flow */
import React from 'react';
import * as R from 'ramda';
import { Grid } from 'material-ui';
import { withProps } from 'recompose';
import PostsList from './PostsList';

type Props = {
  categoryName: String,
};

const Posts = (props: Props) => (
  <Grid container justify="center">
    <Grid item>
      <PostsList categoryName={props.categoryName} />
    </Grid>
    <div />
  </Grid>
);

export default R.compose(
  withProps((props: Props) => ({
    categoryName: R.path(['match', 'params', 'categoryName'], props),
  })),
)(Posts);
