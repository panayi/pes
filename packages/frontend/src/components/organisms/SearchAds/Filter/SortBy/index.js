import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import List from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import {
  selectors as filterAdsSelectors,
  actions as filterAdsActions,
  constants as filterAdsConstants,
} from 'store/filterAds';
import translate from 'components/hocs/translate';
import FilterOption from 'components/atoms/FilterOption';

const styles = {
  list: {
    flex: 0,
    padding: 0,
  },
};

const SortBy = ({ sortBy, setSortBy, t, classes }) => (
  <List classes={{ root: classes.list }}>
    {R.map(
      sortByOption => (
        <FilterOption
          key={sortByOption}
          active={sortByOption === sortBy}
          buttonProps={{
            onClick: () => setSortBy(sortByOption),
          }}
        >
          {t(sortByOption)}
        </FilterOption>
      ),
      filterAdsConstants.SORT_BY_OPTIONS_WITHOUT_DEFAULT_KEYS,
    )}
  </List>
);

const mapStateToProps = createStructuredSelector({
  sortBy: filterAdsSelectors.sortBySelector,
});

const mapDispatchToProps = {
  setSortBy: filterAdsActions.setSortBy,
};

export default R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  translate('sortByOptions'),
  withStyles(styles),
)(SortBy);
