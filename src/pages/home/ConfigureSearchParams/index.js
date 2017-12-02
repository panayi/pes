/* @flow */
import React from 'react';
import * as R from 'ramda';
import { createSelector } from 'reselect';
import { withState, lifecycle, withProps } from 'recompose';
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
  R.prop('page'),
  (categoryName, query, page) => {
    const params = {
      facetFilters: categoryName ? [`category:${categoryName}`] : undefined,
      hitsPerPage: 20,
      query,
    };

    return R.isNil(page) ? params : R.assoc('page', page, params);
  },
);

export default R.compose(
  withState('page', 'setPage', null),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      const nextPage = R.equals(nextProps.categoryName, this.props.categoryName)
        ? null
        : 0;

      if (!R.equals(nextPage, this.props.page)) {
        this.props.setPage(nextPage);
      }
    },
  }),
  connectSearchBox,
  withProps(props => ({
    searchParams: searchParamsSelector(props),
  })),
)(ConfigureSearchParams);
