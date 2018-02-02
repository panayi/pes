import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectors as filterAdsSelectors,
  actions as filterAdsActions,
} from 'store/filterAds';
import SearchLocation from 'components/atoms/SearchLocation';
import CategoryLinks from './CategoryLinks';
import PriceFilter from './PriceFilter';
import SortBy from './SortBy';

const FilterAds = ({ address, setLocation }) => (
  <div>
    <SearchLocation address={address} onChange={setLocation} />
    <CategoryLinks />
    <PriceFilter />
    <SortBy />
  </div>
);

const mapStateToProps = createStructuredSelector({
  address: filterAdsSelectors.addressSelector,
});

const mapDispatchToProps = {
  setLocation: filterAdsActions.setLocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterAds);
