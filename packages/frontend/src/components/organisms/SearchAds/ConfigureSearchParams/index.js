/* @flow */
import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { lifecycle, withProps } from 'recompose';
import { Configure } from 'react-instantsearch/dom';
import { connectHitsPerPage } from 'react-instantsearch/connectors';
import {
  selectors as filterAdsSelectors,
  constants as filterAdsConstants,
} from 'store/filterAds';

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
  withProps({
    defaultRefinement: filterAdsConstants.HITS_PER_PAGE,
    items: [],
  }),
  connectHitsPerPage,
  lifecycle({
    componentWillReceiveProps(nextProps) {
      // Reset page when search parameters change
      const searchParamsChanged = !R.equals(
        nextProps.searchParams,
        this.props.searchParams,
      );
      if (searchParamsChanged) {
        // FIXME: Trick to get the page to reset
        nextProps.refine({ hitsPerPage: filterAdsConstants.HITS_PER_PAGE });
      }
    },
  }),
)(ConfigureSearchParams);
