/* @flow */
import React from 'react';
import * as R from 'ramda';
import { Grid } from 'material-ui';
import { withProps } from 'recompose';
import AdsList from './AdsList';

type Props = {
  categoryName: String,
};

const Ads = (props: Props) => (
  <Grid container justify="center">
    <Grid item>
      <AdsList categoryName={props.categoryName} />
    </Grid>
    <div />
  </Grid>
);

export default R.compose(
  withProps((props: Props) => ({
    categoryName: R.path(['match', 'params', 'categoryName'], props),
  })),
)(Ads);
