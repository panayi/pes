/* @flow */
import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { lifecycle } from 'recompose';
import { Configure } from 'react-instantsearch/dom';
import { connectPagination } from 'react-instantsearch/connectors';
import { selectors as filterAdsSelectors } from 'store/filterAds';

type Props = {
  searchParams: Object,
};

export const ConfigureSearchParams = ({ searchParams }: Props) => (
  <Configure {...searchParams} />
);

const mapStateToProps = createStructuredSelector({
  searchParams: filterAdsSelectors.searchParamsSelector,
});

export default R.compose(
  connect(mapStateToProps),
  connectPagination,
  lifecycle({
    componentWillReceiveProps(nextProps) {
      // Reset page when search parameters change
      const searchParamsChanged = !R.equals(
        nextProps.searchParams,
        this.props.searchParams,
      );
      if (searchParamsChanged) {
        nextProps.refine(1);
      }
    },
  }),
)(ConfigureSearchParams);
