/* @flow */
import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectors as adsSelectors } from 'store/ads';
import AdsList from 'components/organisms/AdsList';

type Props = {
  hits: Array<Object>,
};

const MyAds = ({ hits }: Props) => (
  <AdsList hits={hits} hasMore={false} loadMore={() => {}} sidebarWidth={0} />
);

const mapStateToProps = createStructuredSelector({
  hits: adsSelectors.currentUserAdsSelector,
});

export default R.compose(connect(mapStateToProps))(MyAds);
