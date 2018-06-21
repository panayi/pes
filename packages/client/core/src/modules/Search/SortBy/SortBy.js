import React from 'react';
import * as R from 'ramda';
import { createStructuredSelector } from 'reselect';
import List from '@material-ui/core/List';
import withStyles from '@material-ui/core/styles/withStyles';
import {
  selectors as paramsSelectors,
  actions as paramsActions,
  constants as paramsConstants,
} from '../../../store/search/params';
import connectSearch from '../../../hocs/connectSearch';
import translate from '../../../hocs/translate';
import TrackOnCall from '../../Mixpanel/TrackOnCall/TrackOnCall';
import FilterOption from '../FilterOption/FilterOption';

const styles = {
  list: {
    flex: 0,
    padding: 0,
  },
};

class SortBy extends React.Component {
  renderContent = () => {
    const { sortBy, setSortBy, t, classes } = this.props;

    return (
      <TrackOnCall>
        {({ track }) => (
          <List classes={{ root: classes.list }}>
            {R.map(
              sortByOption => (
                <FilterOption
                  key={sortByOption}
                  active={sortByOption === sortBy}
                  onClick={track(() => setSortBy(sortByOption), 'sortAds', {
                    value: sortByOption,
                  })}
                >
                  {t(sortByOption)}
                </FilterOption>
              ),
              paramsConstants.SORT_BY_OPTIONS_WITHOUT_DEFAULT_KEYS,
            )}
          </List>
        )}
      </TrackOnCall>
    );
  };

  render() {
    const { hasValue, resetSortBy, children } = this.props;

    return children({
      render: this.renderContent,
      hasValue,
      reset: resetSortBy,
    });
  }
}

const mapStateToProps = createStructuredSelector({
  sortBy: paramsSelectors.sortBySelector,
  hasValue: paramsSelectors.sortByHasValueSelector,
});

const mapDispatchToProps = {
  setSortBy: paramsActions.setSortBy,
  resetSortBy: paramsActions.resetSortBy,
};

export default R.compose(
  connectSearch(mapStateToProps, mapDispatchToProps),
  translate('sortByOptions'),
  withStyles(styles),
)(SortBy);
