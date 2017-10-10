/* @flow */
import React from 'react';
import * as R from 'ramda';
import { createSelector } from 'reselect';
import { withProps } from 'recompose';
import { connectSearchBox } from 'react-instantsearch/connectors';
import { Configure } from 'react-instantsearch/dom';

type Props = {
  searchParams: Object,
};

export const ConfigureSearchParams = (props: Props) => (
  <Configure {...props.searchParams} />
);

const searchParamsSelector = createSelector(
  R.prop('categoryName'),
  R.prop('currentRefinement'),
  (categoryName, query) => ({
    facetFilters: categoryName ? [`category:${categoryName}`] : undefined,
    hitsPerPage: 20,
    query,
  }),
);

export default R.compose(
  connectSearchBox,
  withProps(props => ({
    searchParams: searchParamsSelector(props),
  })),
)(ConfigureSearchParams);
