import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import List from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import {
  selectors as sortBySelectors,
  actions as sortByActions,
  constants as sortByConstants,
} from 'store/search/sortBy';
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
      sortByConstants.SORT_BY_OPTIONS_WITHOUT_DEFAULT_KEYS,
    )}
  </List>
);

const mapStateToProps = createStructuredSelector({
  sortBy: sortBySelectors.sortBySelector,
});

const mapDispatchToProps = {
  setSortBy: sortByActions.setSortBy,
};

export default R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  translate('sortByOptions'),
  withStyles(styles),
)(SortBy);
