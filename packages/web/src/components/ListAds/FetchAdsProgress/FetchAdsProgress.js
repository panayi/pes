import React, { Component } from 'react';
import * as R from 'ramda';
import { createStructuredSelector } from 'reselect';
import Typography from 'material-ui/Typography';
import MoodBadIcon from 'material-ui-icons/MoodBad';
import { withStyles } from 'material-ui/styles';
import { selectors as requestSelectors } from 'store/search/request';
import { selectors as totalHitsSelector } from 'store/search/totalHits';
import { selectors as searchSelectors } from 'store/search';
import connectSearch from 'hocs/connectSearch';
import EmptyHero from 'components/EmptyHero/EmptyHero';
import Spinner from 'components/Spinner/Spinner';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 64,
    marginTop: 3 * theme.spacing.unit,
    '> div + div': {
      marginTop: 2 * theme.spacing.unit,
    },
  },
  noResults: {
    marginTop: theme.spacing.unit,
    maxWidth: 400,
  },
  hero: {
    color: theme.palette.text.secondary,
  },
});

class FetchAdsProgress extends Component {
  renderSpinner() {
    const { isLoading, classes } = this.props;

    return isLoading ? (
      <div className={classes.spinner}>
        <Spinner />
      </div>
    ) : null;
  }

  renderNoResults() {
    const { noResults, isProfileSearch, classes } = this.props;

    return noResults ? (
      <div className={classes.noResults}>
        {isProfileSearch ? (
          <EmptyHero className={classes.hero} tagline="No listings yet!" />
        ) : (
          <EmptyHero
            className={classes.hero}
            icon={MoodBadIcon}
            title="Oh snap!"
            tagline="No results found, try looking for something different."
          />
        )}
      </div>
    ) : null;
  }

  renderNoMoreResults() {
    const { noMoreResults, isProfileSearch } = this.props;

    return noMoreResults && !isProfileSearch ? (
      <Typography variant="subheading" color="textSecondary">
        End of results
      </Typography>
    ) : null;
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {this.renderSpinner()}
        {this.renderNoResults()}
        {this.renderNoMoreResults()}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isLoading: requestSelectors.isRequestPendingSelector,
  noResults: totalHitsSelector.noResultsSelector,
  noMoreResults: searchSelectors.noMoreResultsSelector,
  isProfileSearch: searchSelectors.isProfileSearchSelector,
});

export default R.compose(connectSearch(mapStateToProps), withStyles(styles))(
  FetchAdsProgress,
);
