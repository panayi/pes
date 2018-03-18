import React from 'react';
import * as R from 'ramda';
import { createStructuredSelector } from 'reselect';
import List from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import {
  selectors as paramsSelectors,
  actions as paramsActions,
  constants as paramsConstants,
} from 'store/search/params';
import connectSearch from 'hocs/connectSearch';
import translate from 'hocs/translate';
import FilterOption from '../FilterOption/FilterOption';

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
          onClick={() => setSortBy(sortByOption)}
        >
          {t(sortByOption)}
        </FilterOption>
      ),
      paramsConstants.SORT_BY_OPTIONS_WITHOUT_DEFAULT_KEYS,
    )}
  </List>
);

const mapStateToProps = createStructuredSelector({
  sortBy: paramsSelectors.sortBySelector,
});

const mapDispatchToProps = {
  setSortBy: paramsActions.setSortBy,
};

export default R.compose(
  connectSearch(mapStateToProps, mapDispatchToProps),
  translate('sortByOptions'),
  withStyles(styles),
)(SortBy);
