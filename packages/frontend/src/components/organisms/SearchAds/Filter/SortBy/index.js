import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Select from 'material-ui/Select';
import Input from 'material-ui/Input';
import {
  selectors as filterAdsSelectors,
  actions as filterAdsActions,
  constants as filterAdsConstants,
} from 'store/filterAds';

const SortBy = ({ sortBy, setSortBy }) => (
  <Select
    native
    value={sortBy || ''}
    onChange={event => setSortBy(event.target.value)}
    input={<Input id="sort-by" />}
  >
    <option value="">Sort by</option>
    {R.map(
      sortByOption => (
        <option key={sortByOption} value={sortByOption}>
          {sortByOption}
        </option>
      ),
      filterAdsConstants.SORT_BY_OPTIONS_KEYS,
    )}
  </Select>
);

const mapStateToProps = createStructuredSelector({
  sortBy: filterAdsSelectors.sortBySelector,
});

const mapDispatchToProps = {
  setSortBy: filterAdsActions.setSortBy,
};

export default connect(mapStateToProps, mapDispatchToProps)(SortBy);
