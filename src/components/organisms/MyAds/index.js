/* @flow */
import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectors as profileSelectors } from 'store/profile';
import AdsList from 'components/organisms/AdsList';

type Props = {
  hits: Array<Object>,
};

const MyAds = ({ hits }: Props) => (
  <AdsList hits={hits} hasMore={false} loadMore={() => {}} sidebarWidth={0} />
);

const mapStateToProps = createStructuredSelector({
  hits: profileSelectors.currentUserAdIdsSelector,
});

export default R.compose(connect(mapStateToProps))(MyAds);
